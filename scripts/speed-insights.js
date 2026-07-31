/**
 * Vercel Speed Insights Initialization
 * 
 * This script initializes Vercel Speed Insights to track web vitals
 * and performance metrics for the application.
 */

import { injectSpeedInsights } from '../node_modules/@vercel/speed-insights/dist/index.mjs';

/**
 * Initialize Speed Insights
 * This will automatically track Core Web Vitals and other performance metrics
 * when deployed on Vercel. In development mode, it uses debug script.
 */
injectSpeedInsights();
