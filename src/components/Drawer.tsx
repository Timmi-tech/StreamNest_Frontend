import React, { useState } from "react";
import {
  MessageCircle,
  Send,
  Heart,
  MoreHorizontal,
  Reply,
} from "lucide-react";

// Shadcn Drawer Components
export const Drawer = ({ children, open, onOpenChange }) => {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => onOpenChange(false)}
        />
      )}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 transform transition-transform duration-300 ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {children}
      </div>
    </>
  );
};

export const DrawerContent = ({ children }) => (
  <div className="bg-white rounded-t-3xl shadow-2xl max-h-[80vh] flex flex-col">
    <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-3 mb-4" />
    {children}
  </div>
);

export const DrawerHeader = ({ children }) => (
  <div className="px-6 pb-4 border-b border-gray-100">{children}</div>
);

export const DrawerTitle = ({ children }) => (
  <h2 className="text-lg font-semibold text-gray-900">{children}</h2>
);
