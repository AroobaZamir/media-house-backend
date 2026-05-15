/**
 * subscriber controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::subscriber.subscriber', ({ strapi }) => ({
  async create(ctx) {
    try {
      const { data } = ctx.request.body;

      // Validate email is provided
      if (!data || !data.Email) {
        return ctx.badRequest('Email is required');
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.Email)) {
        return ctx.badRequest('Invalid email address');
      }

      // Check if email already exists
      const existingSubscriber = await strapi
        .service('api::subscriber.subscriber')
        .find({ filters: { Email: data.Email } });

      if (existingSubscriber && existingSubscriber.length > 0) {
        return ctx.send({
          data: existingSubscriber[0],
          message: 'You are already subscribed with this email address',
        });
      }

      // Create new subscriber
      const result = await super.create(ctx);
      return result;
    } catch (error: any) {
      strapi.log.error(`Subscriber creation error: ${error.message}`);
      
      // Handle unique constraint violation
      if (error.message.includes('unique') || error.code === 'ER_DUP_ENTRY') {
        return ctx.send({
          message: 'You are already subscribed with this email address',
        }, 200);
      }

      return ctx.internalServerError('Failed to create subscriber');
    }
  },
}));
