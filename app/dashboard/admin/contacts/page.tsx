"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Eye, Trash2, Mail, Calendar, MessageSquare } from "lucide-react";
import Pagination from "@/components/properties/Pagination";
import { SuccessToast } from "@/components/ui/toast";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "new" | "read" | "replied";
  createdAt: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 2;

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/contacts");
      // Sort by date descending
      const sortedContacts = response.data.sort(
        (a: Contact, b: Contact) =>
          new Date(b.createdAt).getDate() - new Date(a.createdAt).getDate()
      );
      setContacts(sortedContacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this contact message?")) {
      try {
        await axios.delete(`http://localhost:3001/contacts/${id}`);
        setContacts(contacts.filter((contact) => contact.id !== id));
        setShowToast(true);
      } catch (error) {
        console.error("Error deleting contact:", error);
        alert("Failed to delete contact");
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "read":
        return "bg-gray-100 text-gray-800";
      case "replied":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Pagination Logic
  const totalPages = Math.ceil(contacts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentContacts = contacts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Contact Messages</h1>
          <p className="text-gray-500 mt-1">Manage inquiries from users</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
          <span className="text-gray-500 mr-2">Total Messages:</span>
          <span className="font-bold text-blue-600">{contacts.length}</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">
                  User
                </th>
                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">
                  Subject
                </th>
                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">
                  Status
                </th>
                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">
                  Date
                </th>
                <th className="px-6 py-4 font-semibold text-gray-600 text-sm text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {contacts.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <MessageSquare className="h-12 w-12 text-gray-300 mb-3" />
                      <p>No messages found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                currentContacts.map((contact) => (
                  <tr
                    key={contact.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold">
                          {contact.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {contact.name}
                          </p>
                          <div className="flex items-center text-xs text-gray-500 mt-0.5">
                            <Mail size={12} className="mr-1" />
                            {contact.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-800 font-medium truncate max-w-xs">
                        {contact.subject}
                      </p>
                      <p className="text-gray-500 text-sm truncate max-w-xs mt-0.5">
                        {contact.message}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
                          contact.status
                        )}`}
                      >
                        {contact.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar size={14} className="mr-2" />
                        {new Date(contact.createdAt).toDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/dashboard/admin/contacts/${contact.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(contact.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
      {showToast && (
        <SuccessToast
          message="Contact message deleted successfully!"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}
