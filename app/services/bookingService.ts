const API_BASE = process.env.JSON_SERVER_URL || 'http://localhost:3001';

export interface BookingData {
  visitType: 'in-person' | 'virtual' | 'open-house';
  date: string;
  timeSlot: string;
  message?: string;
  wantCall: boolean;
  payDeposit: boolean;
  payment?: {
    amount: number;
    cardName: string;
    cardNumberLast4: string;
  } | null;
  propertyId?: string;
  userId?: string;
}

export interface Booking extends BookingData {
  id: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  createdAt: string;
  updatedAt?: string;
}

/**
 * Create a new booking
 */
export async function createBooking(data: BookingData): Promise<{ booking?: Booking; error?: string }> {
  // Validate required fields
  if (!data.date || !data.timeSlot) {
    return { error: 'Date and time slot are required' };
  }

  try {
    const bookingData = {
      ...data,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    const response = await fetch(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      return { error: 'Failed to create booking' };
    }

    const booking: Booking = await response.json();
    return { booking };
  } catch (error) {
    console.error('Error creating booking:', error);
    return { error: 'Network error. Please try again.' };
  }
}

/**
 * Get all bookings
 */
export async function getBookings(): Promise<{ bookings?: Booking[]; error?: string }> {
  try {
    const response = await fetch(`${API_BASE}/bookings`);

    if (!response.ok) {
      return { error: 'Failed to fetch bookings' };
    }

    const bookings: Booking[] = await response.json();
    return { bookings };
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return { error: 'Network error. Please try again.' };
  }
}

/**
 * Get a single booking by ID
 */
export async function getBookingById(id: string): Promise<{ booking?: Booking; error?: string }> {
  try {
    const response = await fetch(`${API_BASE}/bookings/${id}`);

    if (!response.ok) {
      return { error: 'Booking not found' };
    }

    const booking: Booking = await response.json();
    return { booking };
  } catch (error) {
    console.error('Error fetching booking:', error);
    return { error: 'Network error. Please try again.' };
  }
}

/**
 * Update booking status
 */
export async function updateBookingStatus(
  id: string,
  status: 'pending' | 'approved' | 'rejected' | 'completed'
): Promise<{ booking?: Booking; error?: string }> {
  try {
    const response = await fetch(`${API_BASE}/bookings/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status,
        updatedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      return { error: 'Failed to update booking' };
    }

    const booking: Booking = await response.json();
    return { booking };
  } catch (error) {
    console.error('Error updating booking:', error);
    return { error: 'Network error. Please try again.' };
  }
}

/**
 * Delete a booking
 */
export async function deleteBooking(id: string): Promise<{ success?: boolean; error?: string }> {
  try {
    const response = await fetch(`${API_BASE}/bookings/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      return { error: 'Failed to delete booking' };
    }

    return { success: true };
  } catch (error) {
    console.error('Error deleting booking:', error);
    return { error: 'Network error. Please try again.' };
  }
}

/**
 * Get bookings by user ID
 */
export async function getBookingsByUserId(userId: string): Promise<{ bookings?: Booking[]; error?: string }> {
  try {
    const response = await fetch(`${API_BASE}/bookings?userId=${userId}`);

    if (!response.ok) {
      return { error: 'Failed to fetch bookings' };
    }

    const bookings: Booking[] = await response.json();
    return { bookings };
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return { error: 'Network error. Please try again.' };
  }
}

/**
 * Get bookings by property ID
 */
export async function getBookingsByPropertyId(propertyId: string): Promise<{ bookings?: Booking[]; error?: string }> {
  try {
    const response = await fetch(`${API_BASE}/bookings?propertyId=${propertyId}`);

    if (!response.ok) {
      return { error: 'Failed to fetch bookings' };
    }

    const bookings: Booking[] = await response.json();
    return { bookings };
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return { error: 'Network error. Please try again.' };
  }
}

/**
 * Get booked time slots for a specific property and date
 */
export async function getBookedSlots(propertyId: string, date: string): Promise<{ bookedSlots?: string[]; error?: string }> {
  try {
    const response = await fetch(`${API_BASE}/bookings?propertyId=${propertyId}&date=${date}`);

    if (!response.ok) {
      return { error: 'Failed to fetch booked slots' };
    }

    const bookings: Booking[] = await response.json();
    const bookedSlots = bookings
      .filter(booking => booking.status !== 'rejected') // Only consider non-rejected bookings
      .map(booking => booking.timeSlot);
    
    return { bookedSlots };
  } catch (error) {
    console.error('Error fetching booked slots:', error);
    return { error: 'Network error. Please try again.' };
  }
}
