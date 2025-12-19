const API_BASE = process.env.NEXT_PUBLIC_JSON_SERVER_URL || "http://localhost:3001";

export interface Notification {
  id?: string;
  userId: string; // "all" for broadcast, or specific user ID
  type: "booking" | "property" | "user" | "system" | "contact";
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  link?: string; // Optional link to navigate to
}

export async function createNotification(
  notification: Omit<Notification, "id" | "createdAt" | "read">
): Promise<Notification | null> {
  try {
    const res = await fetch(`${API_BASE}/notifications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...notification,
        read: false,
        createdAt: new Date().toISOString(),
      }),
    });

    if (!res.ok) {
      console.error("Failed to create notification");
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Error creating notification:", error);
    return null;
  }
}

export async function getNotifications(userId?: string): Promise<Notification[]> {
  try {
    const res = await fetch(
      `${API_BASE}/notifications?_sort=createdAt&_order=desc&_limit=20`
    );

    if (!res.ok) return [];

    const notifications: Notification[] = await res.json();

    // Filter notifications for this user or broadcast ("all")
    if (userId) {
      return notifications.filter((n) => n.userId === userId || n.userId === "all");
    }

    return notifications;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
}

export async function markAsRead(notificationId: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/notifications/${notificationId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: true }),
    });

    return res.ok;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return false;
  }
}

export async function markAllAsRead(userId?: string): Promise<boolean> {
  try {
    const notifications = await getNotifications(userId);
    const unread = notifications.filter((n) => !n.read);

    await Promise.all(
      unread.map((n) =>
        fetch(`${API_BASE}/notifications/${n.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ read: true }),
        })
      )
    );

    return true;
  } catch (error) {
    console.error("Error marking all as read:", error);
    return false;
  }
}

export async function notifyNewBooking(
  propertyTitle: string,
  ownerId: string,
  buyerName: string
) {
  return createNotification({
    userId: ownerId,
    type: "booking",
    title: "New Booking Request",
    message: `${buyerName} wants to book "${propertyTitle}"`,
    link: "/dashboard/owner/bookings",
  });
}


export async function notifyBookingStatus(
  status: "approved" | "rejected",
  propertyTitle: string,
  buyerId: string
) {
  return createNotification({
    userId: buyerId,
    type: "booking",
    title: status === "approved" ? "Booking Approved" : "Booking Rejected",
    message:
      status === "approved"
        ? `Your booking for "${propertyTitle}" has been approved`
        : `Your booking for "${propertyTitle}" was not approved`,
    link: "/dashboard/buyer/bookings",
  });
}


export async function notifyNewProperty(propertyTitle: string, ownerName: string) {
  return createNotification({
    userId: "all",
    type: "property",
    title: "New Property Listed",
    message: `${ownerName} listed "${propertyTitle}"`,
    link: "/properties",
  });
}

export async function notifyNewContact(senderName: string, subject: string) {
  return createNotification({
    userId: "all", // For admin
    type: "contact",
    title: "New Contact Message",
    message: `${senderName}: ${subject}`,
    link: "/dashboard/admin/contacts",
  });
}

export async function notifyNewUser(userName: string, role: string) {
  return createNotification({
    userId: "all", // For admin
    type: "user",
    title: "New User Registered",
    message: `${userName} joined as ${role}`,
    link: "/dashboard/admin/users",
  });
}
