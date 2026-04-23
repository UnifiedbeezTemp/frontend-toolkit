export interface MessageGroup<T> {
  dateLabel: string;
  messages: T[];
}

/**
 * Groups messages by date with WhatsApp-style labels
 * Generic implementation to support different Message models (API or UI)
 */
export function groupMessagesByDate<T>(
  messages: T[],
  getCreatedAt: (m: T) => string | undefined,
): MessageGroup<T>[] {
  if (!messages || messages.length === 0) return [];

  const groups: MessageGroup<T>[] = [];
  const map: Record<string, T[]> = {};

  messages.forEach((message) => {
    const createdAt = getCreatedAt(message);
    if (!createdAt) return;

    const date = new Date(createdAt);
    const dateKey = date.toDateString(); // "Wed Apr 15 2026"

    if (!map[dateKey]) {
      map[dateKey] = [];
    }
    map[dateKey].push(message);
  });

  // Get unique date keys in order of appearance (input messages should be sorted)
  const dateKeys = Object.keys(map).sort((a, b) => {
    return new Date(a).getTime() - new Date(b).getTime();
  });

  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  dateKeys.forEach((key) => {
    const date = new Date(key);
    let dateLabel = "";

    if (date.toDateString() === now.toDateString()) {
      dateLabel = "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      dateLabel = "Yesterday";
    } else {
      const diffInDays = Math.floor(
        (now.getTime() - date.getTime()) / (1000 * 3600 * 24),
      );

      if (diffInDays < 7) {
        const days = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        dateLabel = days[date.getDay()];
      } else {
        // "Apr 15, 2026"
        dateLabel = date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      }
    }

    groups.push({
      dateLabel,
      messages: map[key],
    });
  });

  return groups;
}
