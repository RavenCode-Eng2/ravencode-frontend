/**
 * Responsive padding utility that replaces hardcoded px-40
 * Provides appropriate padding for different screen sizes
 */
export const getResponsivePadding = () => {
    return "px-4 sm:px-8 md:px-12 lg:px-20 xl:px-40";
};

/**
 * Responsive container utility for main content areas
 */
export const getResponsiveContainer = () => {
    return "px-4 sm:px-8 md:px-12 lg:px-20 xl:px-40 flex flex-1 justify-center py-5";
}; 