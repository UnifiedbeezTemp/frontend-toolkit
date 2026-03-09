"use client";

import React from "react";
import { LogEntry } from "../hooks/useContactListModal";
import { cn } from "../../../../../../../../../lib/utils";
import StatusPill from "../../../../../../../../ui/StatusPill";

interface ListModalTableProps {
  data: LogEntry[];
}

export default function ListModalTable({ data }: ListModalTableProps) {
  return (
    <table className="w-full border-separate border-spacing-0">
      <thead>
        <tr className="bg-input-filled">
          <th className="px-[2.4rem] py-[1.8rem] text-left text-[1.4rem] font-bold text-dark-base-40 border-r border-input-stroke border-b border-input-stroke">
            Date created
          </th>
          <th className="px-[2.4rem] py-[1.8rem] text-left text-[1.4rem] font-bold text-dark-base-40 border-r border-input-stroke border-b border-input-stroke">
            Source
          </th>
          <th className="px-[2.4rem] py-[1.8rem] text-left text-[1.4rem] font-bold text-dark-base-40 border-r border-input-stroke border-b border-input-stroke">
            Status
          </th>
          <th className="px-[2.4rem] py-[1.8rem] text-left text-[1.4rem] font-bold text-dark-base-40 border-b border-input-stroke">
            IP Address
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr
            key={row.id}
            className="hover:bg-input-filled/50 transition-colors"
          >
            <td className="px-[2.4rem] py-[2rem] text-[1.6rem] font-medium text-dark-base-70 border-r border-input-stroke border-b border-input-stroke">
              {row.dateCreated}
            </td>
            <td className="px-[2.4rem] py-[2rem] text-[1.6rem] font-medium text-dark-base-70 border-r border-input-stroke border-b border-input-stroke">
              {row.source}
            </td>
            <td className="px-[2.4rem] py-[2rem] border-r border-input-stroke border-b border-input-stroke">
              <StatusPill status={row.status} />
            </td>
            <td className="px-[2.4rem] py-[2rem] text-[1.6rem] font-medium text-dark-base-70 border-b border-input-stroke">
              {row.ipAddress}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
