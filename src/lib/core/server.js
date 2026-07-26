'use server';

import { headers } from "next/headers";
import { auth } from "../auth";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

// Get JWT Token
export const getJwtToken = async () => {
  try {
    const { token } = await auth.api.getToken({
      headers: await headers()
    });
    return token;
  } catch (error) {
    console.error("Token fetch error:", error);
    return null;
  }
};

// GET Request
export const serverFetch = async (path, options = {}) => {
  const token = await getJwtToken();

  const fetchHeaders = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    fetchHeaders["Authorization"] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${baseUrl}${path}`, {
      ...options,
      headers: fetchHeaders,
    });

    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch {
      console.error(`[serverFetch] Non-JSON response from ${path}:`, text.slice(0, 200));
      return { success: false, error: "Server returned an invalid response. Is the backend running?" };
    }
  } catch (err) {
    console.error(`[serverFetch] Network error for ${path}:`, err.message);
    return { success: false, error: "Could not connect to the server." };
  }
};

// POST, PATCH, DELETE Request
export const serverMutation = async (path, data = null, method = 'POST') => {
  const token = await getJwtToken();

  const fetchHeaders = {
    "Content-Type": "application/json",
  };

  if (token) {
    fetchHeaders["Authorization"] = `Bearer ${token}`;
  }

  const options = {
    method: method,
    headers: fetchHeaders,
  };


  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const res = await fetch(`${baseUrl}${path}`, options);
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch {
      console.error(`[serverMutation] Non-JSON response from ${path}:`, text.slice(0, 200));
      return { success: false, error: "Server returned an invalid response." };
    }
  } catch (err) {
    console.error(`[serverMutation] Network error for ${path}:`, err.message);
    return { success: false, error: "Could not connect to the server." };
  }
};