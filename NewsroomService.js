/**
 * Simple Newsroom Service
 * Handles content creation with economic justice integration
 */
const EconomicJusticeService = require('./EconomicJusticeService');

class NewsroomService {
  constructor() {
    this.economicService = new EconomicJusticeService();
  }

  createContent(data) {
    if (!data.title || !data.content || !data.author) {
      throw new Error('Title, content, and author required');
    }

    const revenue = data.revenue || 0;
    const revenueData = this.economicService.calculateCreatorRevenue(revenue);

    return {
      id: `content_${Date.now()}`,
      title: data.title,
      content: data.content,
      author: data.author,
      revenue: revenueData,
      created: new Date().toISOString(),
      liberationCompliant: this.economicService.validateSovereignty(revenueData)
    };
  }

  getHealthCheck() {
    return {
      service: 'newsroom',
      status: 'healthy',
      timestamp: new Date().toISOString()
    };
  }
}

module.exports = NewsroomService;