"use client";

import { useEffect } from "react";

type SessionRefreshProps = {
    enabled: boolean;
};

export default function SessionRefresh({ enabled }: SessionRefreshProps) {
    useEffect(() => {
        if (!enabled) {
            return;
        }

        void fetch("/api/auth/refresh", {
            method: "POST",
            credentials: "include",
        });
    }, [enabled]);

    return null;
}
