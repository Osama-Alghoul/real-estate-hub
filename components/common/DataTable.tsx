"use client";

import React from "react";
import Loading from "./Loading";

export type Column<T> = {
  key: keyof T;
  label: string;
  className?: string;
  render?: (row: T) => React.ReactNode;
  width?: string;
};

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  emptyMessage?: string;
  renderActions?: (row: T) => React.ReactNode;
};

export default function DataTable<T extends { id: string | number }>({
  data,
  columns,
  isLoading = false,
  emptyMessage = "No data found",
  renderActions,
}: DataTableProps<T>) {
  return (
    <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
      {/* TABLE */}
      <div className="w-full overflow-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={`px-4 py-3 font-medium whitespace-nowrap ${
                    col.className ?? ""
                  }`}
                  style={col.width ? { width: col.width } : undefined}
                >
                  {col.label}
                </th>
              ))}
              {renderActions && <th className="px-4 py-3 font-medium whitespace-nowrap">Actions</th>}
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length + (renderActions ? 1 : 0)} className="text-center py-8 text-gray-500">
                  <Loading />
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + + (renderActions ? 1 : 0)}
                  className="text-center py-8 text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr
                  key={row.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  {columns.map((col) => (
                    <td
                      key={String(col.key)}
                      className="px-4 py-3 align-middle whitespace-nowrap"
                    >
                      {col.render
                        ? col.render(row)
                        : String(row[col.key] ?? "")}
                    </td>
                  ))}
                  {renderActions && <td className="px-4 py-3 align-middle">{renderActions(row)}</td>}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
