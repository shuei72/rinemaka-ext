import * as vscode from "vscode";

import {
  MarkerScope,
  LineMarker,
  getMarkerLocationLabel,
  getMarkerPreview,
  getMarkers
} from "./markers";

type TreeNode =
  | { kind: "section"; scope: MarkerScope; label: string }
  | { kind: "marker"; marker: LineMarker };

export class LineMarkerProvider implements vscode.TreeDataProvider<TreeNode> {
  private readonly onDidChangeTreeDataEmitter = new vscode.EventEmitter<TreeNode | undefined | null | void>();

  readonly onDidChangeTreeData = this.onDidChangeTreeDataEmitter.event;

  refresh(): void {
    this.onDidChangeTreeDataEmitter.fire();
  }

  getTreeItem(element: TreeNode): vscode.TreeItem {
    if (element.kind === "section") {
      const item = new vscode.TreeItem(element.label, vscode.TreeItemCollapsibleState.Expanded);
      item.contextValue = element.scope === "session" ? "rinemacaSessionSection" : "rinemacaWorkspaceSection";
      return item;
    }

    const preview = getMarkerPreview(element.marker);
    const item = new vscode.TreeItem(`Line ${element.marker.line + 1}`, vscode.TreeItemCollapsibleState.None);
    item.description = preview;
    item.tooltip = new vscode.MarkdownString(
      `**${getMarkerLocationLabel(element.marker)}**\n\n${escapeMarkdown(preview)}`
    );
    item.contextValue = element.marker.scope === "session" ? "rinemacaSessionMarker" : "rinemacaWorkspaceMarker";
    item.command = {
      command: "rinemaca.openMarker",
      title: "Open Marker",
      arguments: [element.marker.id]
    };
    item.resourceUri = vscode.Uri.parse(element.marker.uri);
    return item;
  }

  getChildren(element?: TreeNode): Thenable<TreeNode[]> {
    if (!element) {
      return Promise.resolve([
        { kind: "section", scope: "session", label: "Session Markers" },
        { kind: "section", scope: "workspace", label: "Workspace Markers" }
      ]);
    }

    if (element.kind === "section") {
      return Promise.resolve(getMarkers(element.scope).map((marker) => ({ kind: "marker" as const, marker })));
    }

    return Promise.resolve([]);
  }
}

function escapeMarkdown(value: string): string {
  return value.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&");
}
