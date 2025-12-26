"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Trash2,
  Mail,
  Phone,
  Calendar,
  User,
  Clock,
  MessageSquare,
} from "lucide-react";
import { SuccessToast } from "@/components/ui/Toast";

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

export default function ContactDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/contacts/${id}`);
        setContact(response.data);

        if (response.data.status === "new") {
          await axios.patch(`http://localhost:3001/contacts/${id}`, {
            status: "read",
          });
        }
      } catch (error) {
        console.error("Error fetching contact:", error);
        alert("Contact not found");
        router.push("/dashboard/admin/contacts");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchContact();
    }
  }, [id, router]);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this contact message?")) {
      try {
        await axios.delete(`http://localhost:3001/contacts/${id}`);
        setShowToast(true);
        setTimeout(() => {
          router.push("/dashboard/admin/contacts");
        }, 1500);
      } catch (error) {
        console.error("Error deleting contact:", error);
        alert("Failed to delete contact");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!contact) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard/admin/contacts"
          className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Contacts
        </Link>

        <button
          onClick={handleDelete}
          className="flex items-center px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
        >
          <Trash2 size={18} className="mr-2" />
          Delete Message
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 bg-gray-50">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {contact.subject}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <Calendar size={14} className="mr-1.5" />
                  {new Date(contact.createdAt).toDateString()}
                </span>
                <span className="flex items-center">
                  <Clock size={14} className="mr-1.5" />
                  {new Date(contact.createdAt).toTimeString()}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                    contact.status === "new"
                      ? "bg-blue-100 text-blue-800"
                      : contact.status === "replied"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {contact.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sender Info */}
          <div className="md:col-span-1 space-y-6">
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Sender Details
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-white p-2 rounded-full shadow-sm text-blue-600">
                    <User size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Name</p>
                    <p className="font-medium text-gray-900">{contact.name}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-white p-2 rounded-full shadow-sm text-blue-600">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="font-medium text-blue-600 hover:underline break-all"
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-white p-2 rounded-full shadow-sm text-blue-600">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <a
                      href={`tel:${contact.phone}`}
                      className="font-medium text-gray-900 hover:text-blue-600"
                    >
                      {contact.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Message Body */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Message Content
            </h3>
            <div className="bg-gray-50 p-6 rounded-lg min-h-[200px]">
              <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                {contact.message}
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <a
                href={`mailto:${contact.email}?subject=Re: ${contact.subject}`}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                <MessageSquare size={18} className="mr-2" />
                Reply via Email
              </a>
            </div>
          </div>
        </div>
      </div>
      {showToast && (
        <SuccessToast
          message="Contact message deleted successfully!"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}
