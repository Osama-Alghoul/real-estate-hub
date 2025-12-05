const API_BASE = process.env.NEXT_PUBLIC_JSON_SERVER_URL || 'http://localhost:3001';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface Contact extends ContactFormData {
  id: string;
  createdAt: string;
  status: 'new' | 'read' | 'responded';
}

/**
 * Submit a contact form
 */
export async function submitContact(data: ContactFormData): Promise<{ contact?: Contact; error?: string }> {
  // Validate required fields
  if (!data.name || !data.email || !data.subject || !data.message) {
    return { error: 'Please fill in all required fields' };
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return { error: 'Please enter a valid email address' };
  }

  try {
    const contactData = {
      ...data,
      status: 'new' as const,
      createdAt: new Date().toISOString(),
    };

    const response = await fetch(`${API_BASE}/contacts`, {
     method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });

    if (!response.ok) {
      return { error: 'Failed to submit contact form' };
    }

    const contact: Contact = await response.json();
    return { contact };
  } catch (error) {
    console.error('Error submitting contact:', error);
    return { error: 'Network error. Please try again.' };
  }
}

/**
 * Get all contacts
 */
export async function getContacts(): Promise<{ contacts?: Contact[]; error?: string }> {
  try {
    const response = await fetch(`${API_BASE}/contacts`);

    if (!response.ok) {
      return { error: 'Failed to fetch contacts' };
    }

    const contacts: Contact[] = await response.json();
    return { contacts };
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return { error: 'Network error. Please try again.' };
  }
}

/**
 * Get a single contact by ID
 */
export async function getContactById(id: string): Promise<{ contact?: Contact; error?: string }> {
  try {
    const response = await fetch(`${API_BASE}/contacts/${id}`);

    if (!response.ok) {
      return { error: 'Contact not found' };
    }

    const contact: Contact = await response.json();
    return { contact };
  } catch (error) {
    console.error('Error fetching contact:', error);
    return { error: 'Network error. Please try again.' };
  }
}

/**
 * Update contact status
 */
export async function updateContactStatus(
  id: string,
  status: 'new' | 'read' | 'responded'
): Promise<{ contact?: Contact; error?: string }> {
  try {
    const response = await fetch(`${API_BASE}/contacts/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      return { error: 'Failed to update contact' };
    }

    const contact: Contact = await response.json();
    return { contact };
  } catch (error) {
    console.error('Error updating contact:', error);
    return { error: 'Network error. Please try again.' };
  }
}

/**
 * Delete a contact
 */
export async function deleteContact(id: string): Promise<{ success?: boolean; error?: string }> {
  try {
    const response = await fetch(`${API_BASE}/contacts/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      return { error: 'Failed to delete contact' };
    }

    return { success: true };
  } catch (error) {
    console.error('Error deleting contact:', error);
    return { error: 'Network error. Please try again.' };
  }
}
