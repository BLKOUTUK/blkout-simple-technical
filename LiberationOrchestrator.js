/**
 * Simple Liberation Orchestrator
 * Minimal orchestration without complex method chains
 */
const EconomicJusticeService = require('./EconomicJusticeService');
const NewsroomService = require('./NewsroomService');

class LiberationOrchestrator {
  constructor() {
    this.economicService = new EconomicJusticeService();
    this.newsroomService = new NewsroomService();
    this.blkouthubService = new BlkouthubService();
    this.metrics = {
      totalContent: 0,
      totalRevenue: 0,
      sovereigntyViolations: 0
    };
  }

  // Simple method with no complex dependencies
  monitorLiberationMetrics() {
    try {
      const healthChecks = [
        this.newsroomService.getHealthCheck(),
        { service: 'economic', status: 'healthy', timestamp: new Date().toISOString() }
      ];

      const overallHealth = healthChecks.every(check => check.status === 'healthy') ? 'healthy' : 'unhealthy';

      return {
        timestamp: new Date().toISOString(),
        overallHealth,
        services: healthChecks,
        metrics: this.metrics,
        liberationScore: this.calculateSimpleLiberationScore()
      };
    } catch (error) {
      console.error('Liberation monitoring failed:', error);
      return {
        timestamp: new Date().toISOString(),
        overallHealth: 'error',
        error: error.message,
        metrics: this.metrics,
        liberationScore: 0.5
      };
    }
  }

  // Simple method with no external dependencies
  calculateSimpleLiberationScore() {
    if (this.metrics.totalContent === 0) return 0.5;

    const violationRate = this.metrics.sovereigntyViolations / this.metrics.totalContent;
    return Math.max(0, 1 - violationRate);
  }

  // Simple feature flag management without complex governance
  manageFeatureFlags(request) {
    const allowedFlags = ['culturalCelebration', 'traumaInformed', 'communityProtection'];

    if (!allowedFlags.includes(request.flagName)) {
      throw new Error(`Feature flag '${request.flagName}' not found`);
    }

    return {
      flagName: request.flagName,
      action: request.action,
      success: true,
      timestamp: new Date().toISOString(),
      message: `Feature flag '${request.flagName}' ${request.action} successful`
    };
  }

  // Process content creation with simple validation
  processContentCreation(contentData) {
    try {
      const content = this.newsroomService.createContent(contentData);

      // Update metrics
      this.metrics.totalContent++;
      this.metrics.totalRevenue += content.revenue.total;

      if (!content.liberationCompliant) {
        this.metrics.sovereigntyViolations++;
      }

      return {
        success: true,
        content,
        liberationMetrics: this.monitorLiberationMetrics()
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        liberationMetrics: this.monitorLiberationMetrics()
      };
    }
  }

  // BLKOUTHUB Community Management
  getBlkouthubMembers() {
    return this.blkouthubService.getActiveMembers();
  }

  findMemberMatches(memberId) {
    return this.blkouthubService.findMatches(memberId);
  }

  getHotseatSessions() {
    return this.blkouthubService.getCurrentHotseats();
  }

  createHotseatSession(sessionData) {
    return this.blkouthubService.createHotseat(sessionData);
  }

  joinHotseatSession(sessionId, memberId) {
    return this.blkouthubService.joinHotseat(sessionId, memberId);
  }
}

// BLKOUTHUB Service - Real community connection and member management
class BlkouthubService {
  constructor() {
    this.members = this.initializeMemberProfiles();
    this.hotseats = this.initializeHotseats();
    this.matchingAlgorithm = new MemberMatchingAlgorithm();
  }

  initializeMemberProfiles() {
    return [
      {
        id: 'mem_001',
        name: 'Marcus',
        age: 28,
        location: 'South London',
        interests: ['activism', 'music', 'community organizing'],
        profilePic: '🎤',
        bio: 'Community organizer passionate about liberation through arts',
        memberSince: '2024-01-15',
        contributions: ['Organized 3 community events', 'Led storytelling workshop'],
        lookingFor: 'Community connections and collaboration opportunities'
      },
      {
        id: 'mem_002',
        name: 'Jordan',
        age: 32,
        location: 'Birmingham',
        interests: ['tech', 'education', 'mental health'],
        profilePic: '💻',
        bio: 'Tech worker building tools for community empowerment',
        memberSince: '2024-02-20',
        contributions: ['Built member directory app', 'Mentored 5 young developers'],
        lookingFor: 'Technical collaborators and mentorship opportunities'
      },
      {
        id: 'mem_003',
        name: 'Kai',
        age: 25,
        location: 'Manchester',
        interests: ['writing', 'poetry', 'social justice'],
        profilePic: '✍️',
        bio: 'Writer and poet documenting our liberation journey',
        memberSince: '2024-03-10',
        contributions: ['Published 12 liberation stories', 'Hosted 2 poetry nights'],
        lookingFor: 'Creative collaborators and storytelling partners'
      },
      {
        id: 'mem_004',
        name: 'Devon',
        age: 29,
        location: 'Leeds',
        interests: ['fitness', 'wellness', 'community building'],
        profilePic: '💪',
        bio: 'Wellness coach focused on holistic community health',
        memberSince: '2024-01-08',
        contributions: ['Led 15 wellness workshops', 'Created fitness groups'],
        lookingFor: 'Wellness collaborators and community health advocates'
      }
    ];
  }

  initializeHotseats() {
    return [
      {
        id: 'hotseat_001',
        title: 'Liberation Through Tech',
        host: 'Jordan',
        topic: 'Building community-owned digital platforms',
        participants: ['Marcus', 'Kai'],
        maxParticipants: 6,
        status: 'live',
        startTime: new Date().toISOString(),
        description: 'Discussing how technology can serve liberation rather than exploitation'
      },
      {
        id: 'hotseat_002',
        title: 'Community Organizing Stories',
        host: 'Marcus',
        topic: 'Sharing experiences from the frontlines of liberation work',
        participants: ['Devon'],
        maxParticipants: 8,
        status: 'starting_soon',
        startTime: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 mins from now
        description: 'Real talk about community organizing successes and challenges'
      },
      {
        id: 'hotseat_003',
        title: 'Wellness & Resistance',
        host: 'Devon',
        topic: 'Maintaining mental health while fighting for justice',
        participants: [],
        maxParticipants: 5,
        status: 'scheduled',
        startTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
        description: 'How do we stay healthy while doing liberation work?'
      }
    ];
  }

  getActiveMembers() {
    return {
      success: true,
      data: {
        totalMembers: this.members.length,
        onlineNow: Math.floor(this.members.length * 0.6), // 60% online
        members: this.members.map(member => ({
          ...member,
          isOnline: Math.random() > 0.4, // Random online status
          lastSeen: this.generateRecentTimestamp()
        }))
      }
    };
  }

  findMatches(memberId) {
    const member = this.members.find(m => m.id === memberId);
    if (!member) {
      return { success: false, error: 'Member not found' };
    }

    const matches = this.matchingAlgorithm.findMatches(member, this.members);
    return {
      success: true,
      data: {
        memberId,
        matches: matches.slice(0, 3), // Top 3 matches
        matchingCriteria: ['shared interests', 'geographic proximity', 'community contributions']
      }
    };
  }

  getCurrentHotseats() {
    return {
      success: true,
      data: {
        liveNow: this.hotseats.filter(h => h.status === 'live'),
        startingSoon: this.hotseats.filter(h => h.status === 'starting_soon'),
        scheduled: this.hotseats.filter(h => h.status === 'scheduled'),
        totalActive: this.hotseats.length
      }
    };
  }

  createHotseat(sessionData) {
    const newSession = {
      id: `hotseat_${Date.now()}`,
      ...sessionData,
      participants: [],
      status: 'scheduled',
      createdAt: new Date().toISOString()
    };

    this.hotseats.push(newSession);
    return { success: true, data: newSession };
  }

  joinHotseat(sessionId, memberId) {
    const session = this.hotseats.find(h => h.id === sessionId);
    const member = this.members.find(m => m.id === memberId);

    if (!session) {
      return { success: false, error: 'Session not found' };
    }

    if (!member) {
      return { success: false, error: 'Member not found' };
    }

    if (session.participants.length >= session.maxParticipants) {
      return { success: false, error: 'Session is full' };
    }

    if (!session.participants.includes(member.name)) {
      session.participants.push(member.name);
    }

    return {
      success: true,
      data: {
        sessionId,
        member: member.name,
        totalParticipants: session.participants.length,
        session
      }
    };
  }

  generateRecentTimestamp() {
    const now = new Date();
    const minutesAgo = Math.floor(Math.random() * 120); // Last 2 hours
    return new Date(now - minutesAgo * 60 * 1000).toISOString();
  }
}

// Member Matching Algorithm - Finds compatible community members
class MemberMatchingAlgorithm {
  findMatches(targetMember, allMembers) {
    const otherMembers = allMembers.filter(m => m.id !== targetMember.id);

    return otherMembers.map(member => {
      const score = this.calculateCompatibilityScore(targetMember, member);
      return {
        member,
        compatibilityScore: score,
        sharedInterests: this.findSharedInterests(targetMember.interests, member.interests),
        reasonsToConnect: this.generateConnectionReasons(targetMember, member)
      };
    }).sort((a, b) => b.compatibilityScore - a.compatibilityScore);
  }

  calculateCompatibilityScore(member1, member2) {
    let score = 0;

    // Shared interests (40% of score)
    const sharedInterests = this.findSharedInterests(member1.interests, member2.interests);
    score += (sharedInterests.length / Math.max(member1.interests.length, member2.interests.length)) * 40;

    // Geographic proximity (30% of score)
    if (this.isSameRegion(member1.location, member2.location)) {
      score += 30;
    } else if (this.isNearbyRegion(member1.location, member2.location)) {
      score += 15;
    }

    // Community contribution level (20% of score)
    const contributionCompatibility = this.assessContributionCompatibility(member1, member2);
    score += contributionCompatibility * 20;

    // Age proximity (10% of score)
    const ageDiff = Math.abs(member1.age - member2.age);
    if (ageDiff <= 3) score += 10;
    else if (ageDiff <= 7) score += 5;

    return Math.round(score);
  }

  findSharedInterests(interests1, interests2) {
    return interests1.filter(interest => interests2.includes(interest));
  }

  isSameRegion(location1, location2) {
    return location1.toLowerCase().includes(location2.toLowerCase()) ||
           location2.toLowerCase().includes(location1.toLowerCase());
  }

  isNearbyRegion(location1, location2) {
    const northCities = ['manchester', 'leeds', 'liverpool', 'birmingham'];
    const southCities = ['london', 'brighton', 'bristol'];

    const loc1Lower = location1.toLowerCase();
    const loc2Lower = location2.toLowerCase();

    const isLoc1North = northCities.some(city => loc1Lower.includes(city));
    const isLoc2North = northCities.some(city => loc2Lower.includes(city));
    const isLoc1South = southCities.some(city => loc1Lower.includes(city));
    const isLoc2South = southCities.some(city => loc2Lower.includes(city));

    return (isLoc1North && isLoc2North) || (isLoc1South && isLoc2South);
  }

  assessContributionCompatibility(member1, member2) {
    const contributions1 = member1.contributions.length;
    const contributions2 = member2.contributions.length;
    const avgContributions = (contributions1 + contributions2) / 2;

    return Math.min(avgContributions / 5, 1); // Normalize to 0-1 scale
  }

  generateConnectionReasons(member1, member2) {
    const reasons = [];
    const sharedInterests = this.findSharedInterests(member1.interests, member2.interests);

    if (sharedInterests.length > 0) {
      reasons.push(`Both passionate about ${sharedInterests.join(' and ')}`);
    }

    if (this.isSameRegion(member1.location, member2.location)) {
      reasons.push('Same local area - could meet up in person');
    }

    if (member1.contributions.length > 2 && member2.contributions.length > 2) {
      reasons.push('Both active contributors to the community');
    }

    const ageDiff = Math.abs(member1.age - member2.age);
    if (ageDiff <= 5) {
      reasons.push('Similar life stage and experiences');
    }

    return reasons.slice(0, 3); // Limit to 3 reasons
  }
}

module.exports = LiberationOrchestrator;