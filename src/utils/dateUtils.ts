/**
 * Format a timestamp into a human-readable date string
 * @param timestamp Unix timestamp in milliseconds
 * @returns Formatted date string (e.g., "Jan 5, 2023")
 */
export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

/**
 * Format a timestamp into a relative time string (e.g., "2 days ago")
 * @param timestamp Unix timestamp in milliseconds
 * @returns Relative time string
 */
export const getRelativeTime = (timestamp: number): string => {
  const now = Date.now();
  const diff = now - timestamp;

  // Convert time difference to seconds
  const seconds = Math.floor(diff / 1000);

  // Less than a minute
  if (seconds < 60) {
    return "just now";
  }

  // Minutes
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  }

  // Hours
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  }

  // Days
  const days = Math.floor(hours / 24);
  if (days < 7) {
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  }

  // Weeks
  const weeks = Math.floor(days / 7);
  if (weeks < 4) {
    return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  }

  // Default to standard date format for older dates
  return formatDate(timestamp);
};
