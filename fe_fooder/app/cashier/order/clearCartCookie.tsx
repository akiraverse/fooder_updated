"use client";

import { useEffect } from "react";
import { clearCartCookie } from "@/lib/cart-cookies";
import { useRouter } from "next/navigation";

export default function ClearCartOnMount() {
	const router = useRouter();

	useEffect(() => {
		clearCartCookie(); // Clear it immediately
		router.refresh();  // Force re-render to reflect server changes
	}, []);

	return null; // no visible component
}
