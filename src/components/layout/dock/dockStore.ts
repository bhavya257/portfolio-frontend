"use client";

import { useEffect, useId, useRef, useSyncExternalStore } from "react";
import { DOCK_PRIORITY, type DockSignal } from "./types";

interface SignalEntry {
  id: string;
  priority: number;
  order: number;
  signal: DockSignal;
}

type Listener = () => void;

const signals = new Map<string, SignalEntry>();
const listeners = new Set<Listener>();
let nextOrder = 1;
let activeSignalSnapshot: DockSignal | null = null;

function recomputeSnapshot() {
  if (signals.size === 0) {
    activeSignalSnapshot = null;
    return;
  }

  let best: SignalEntry | null = null;
  for (const entry of signals.values()) {
    if (
      !best ||
      entry.priority > best.priority ||
      (entry.priority === best.priority && entry.order > best.order)
    ) {
      best = entry;
    }
  }

  activeSignalSnapshot = best ? best.signal : null;
}

function emitChange() {
  recomputeSnapshot();
  for (const listener of listeners) {
    listener();
  }
}

export function setDockSignal(
  id: string,
  signal: DockSignal,
  priority: number = DOCK_PRIORITY.PAGE
) {
  const existing = signals.get(id);
  signals.set(id, {
    id,
    priority,
    order: existing ? existing.order : nextOrder++,
    signal,
  });
  emitChange();
}

export function clearDockSignal(id: string) {
  if (!signals.has(id)) return;
  signals.delete(id);
  emitChange();
}

function subscribeDock(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getDockSnapshot(): DockSignal | null {
  return activeSignalSnapshot;
}

function getServerDockSnapshot(): DockSignal | null {
  return null;
}

/**
 * Subscribes to the highest-priority active dock signal.
 * Used internally by the Dock component.
 */
export function useActiveDockSignal(): DockSignal | null {
  return useSyncExternalStore(
    subscribeDock,
    getDockSnapshot,
    getServerDockSnapshot
  );
}

/**
 * Sends a signal from any component (page, gallery, navbar menu, modal) to the Dock
 * to switch modes, render controls, and route actions back to the component.
 * Automatically restores the previous dock state when deactivated or unmounted.
 */
export function useDockSignal(
  signal: DockSignal | null,
  priority: number = DOCK_PRIORITY.PAGE
) {
  const id = useId();
  const onActionRef = useRef(signal?.onAction);

  useEffect(() => {
    onActionRef.current = signal?.onAction;
  });

  const isActive = signal !== null;
  const mode = signal?.mode;
  const items = signal?.items;
  const options = signal?.options;

  useEffect(() => {
    if (!isActive || !mode || !items) {
      clearDockSignal(id);
      return;
    }

    setDockSignal(
      id,
      {
        mode,
        items,
        options,
        onAction: (actionId: string, payload?: unknown) => {
          onActionRef.current?.(actionId, payload);
        },
      },
      priority
    );
  }, [id, isActive, mode, items, options, priority]);

  useEffect(() => {
    return () => {
      clearDockSignal(id);
    };
  }, [id]);
}

