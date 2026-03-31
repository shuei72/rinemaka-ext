import * as vscode from "vscode";

import { LineMarkerProvider } from "./LineMarkerProvider";
import {
  addMarkersForSelection,
  clearMarkers,
  exportMarkersToCsv,
  findMarkerById,
  getMarkers,
  initializeMarkers,
  removeMarkersAtLocation,
  revealMarker,
  renderMarkersForVisibleEditors
} from "./markers";

const ADD_SESSION_COMMAND = "rinemaca.addSessionLineMarker";
const ADD_WORKSPACE_COMMAND = "rinemaca.addWorkspaceLineMarker";
const REMOVE_COMMAND = "rinemaca.removeLineMarker";
const OPEN_COMMAND = "rinemaca.openMarker";
const CLEAR_SESSION_COMMAND = "rinemaca.clearSessionMarkers";
const CLEAR_WORKSPACE_COMMAND = "rinemaca.clearWorkspaceMarkers";
const EXPORT_SESSION_CSV_COMMAND = "rinemaca.exportSessionMarkersCsv";
const EXPORT_WORKSPACE_CSV_COMMAND = "rinemaca.exportWorkspaceMarkersCsv";
const VIEW_ID = "rinemacaMarkersView";

export function activate(context: vscode.ExtensionContext): void {
  const provider = new LineMarkerProvider();
  const refresh = (): void => {
    renderMarkersForVisibleEditors();
    provider.refresh();
  };

  context.subscriptions.push(
    ...initializeMarkers(context),
    vscode.window.registerTreeDataProvider(VIEW_ID, provider),
    vscode.commands.registerCommand(ADD_SESSION_COMMAND, async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      const created = await addMarkersForSelection(context, editor, "session");
      refresh();
      if (created.length === 0) {
        void vscode.window.showInformationMessage("Selected lines are already marked for this session.");
      }
    }),
    vscode.commands.registerCommand(ADD_WORKSPACE_COMMAND, async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      const created = await addMarkersForSelection(context, editor, "workspace");
      refresh();
      if (created.length === 0) {
        void vscode.window.showInformationMessage("Selected lines are already saved as workspace markers.");
      }
    }),
    vscode.commands.registerCommand(REMOVE_COMMAND, async (target?: unknown) => {
      const resolvedMarker = resolveMarker(target) ?? getActiveLineMarker();
      if (!resolvedMarker) {
        void vscode.window.showInformationMessage("No marked line was found.");
        return;
      }

      const removed = await removeMarkersAtLocation(context, resolvedMarker.uri, resolvedMarker.line);
      refresh();
      if (!removed) {
        void vscode.window.showInformationMessage("No marked line was found.");
      }
    }),
    vscode.commands.registerCommand(OPEN_COMMAND, async (target?: unknown) => {
      const resolvedMarker = resolveMarker(target);
      if (!resolvedMarker) {
        return;
      }

      await revealMarker(resolvedMarker);
    }),
    vscode.commands.registerCommand(CLEAR_SESSION_COMMAND, async () => {
      await clearMarkers(context, "session");
      refresh();
    }),
    vscode.commands.registerCommand(CLEAR_WORKSPACE_COMMAND, async () => {
      await clearMarkers(context, "workspace");
      refresh();
    }),
    vscode.commands.registerCommand(EXPORT_SESSION_CSV_COMMAND, async () => {
      await exportMarkersToCsv("session");
    }),
    vscode.commands.registerCommand(EXPORT_WORKSPACE_CSV_COMMAND, async () => {
      await exportMarkersToCsv("workspace");
    }),
    vscode.workspace.onDidChangeTextDocument(() => {
      provider.refresh();
    }),
    vscode.window.onDidChangeActiveTextEditor(() => {
      provider.refresh();
    }),
    vscode.window.onDidChangeVisibleTextEditors(() => {
      provider.refresh();
    })
  );

  refresh();
}

export function deactivate(): void {
}

function getActiveLineMarker() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return undefined;
  }

  const uri = editor.document.uri.toString();
  const line = editor.selection.active.line;
  return getMarkers().find((item) => item.uri === uri && item.line === line);
}

function resolveMarkerId(target: unknown): string | undefined {
  if (typeof target === "string") {
    return target;
  }

  if (!target || typeof target !== "object") {
    return undefined;
  }

  if ("marker" in target) {
    const marker = (target as { marker?: { id?: unknown } }).marker;
    return typeof marker?.id === "string" ? marker.id : undefined;
  }

  if ("id" in target) {
    const id = (target as { id?: unknown }).id;
    return typeof id === "string" ? id : undefined;
  }

  return undefined;
}

function resolveMarker(target: unknown) {
  const markerId = resolveMarkerId(target);
  if (!markerId) {
    return undefined;
  }

  return findMarkerById(markerId);
}
