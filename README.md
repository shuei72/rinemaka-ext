# Rinemaca

Rinemaca is a VS Code extension for managing line markers in either session scope or workspace scope.  
The sidebar shows marker lists and supports CSV export.

## Commands

`Rinemaca: Add Session Marker`  
Adds the selected line as a session marker.

`Rinemaca: Add Workspace Marker`  
Adds the selected line as a workspace marker.

`Rinemaca: Toggle Session Marker`  
Adds or removes a session marker on the selected line.

`Rinemaca: Toggle Workspace Marker`  
Adds or removes a workspace marker on the selected line.

`Rinemaca: Remove Marker`  
Removes the marker on the selected line.

`Rinemaca: Clear Session Markers`  
Removes all session markers.

`Rinemaca: Clear Workspace Markers`  
Removes all workspace markers.

`Rinemaca: Export Session Markers`  
Exports session markers to CSV.

`Rinemaca: Export Workspace Markers`  
Exports workspace markers to CSV.

`Rinemaca: Next Marker`  
Moves to the next marker across both session and workspace markers.

`Rinemaca: Previous Marker`  
Moves to the previous marker across both session and workspace markers.

`Rinemaca: Next Session Marker`  
Moves to the next session marker.

`Rinemaca: Previous Session Marker`  
Moves to the previous session marker.

`Rinemaca: Next Workspace Marker`  
Moves to the next workspace marker.

`Rinemaca: Previous Workspace Marker`  
Moves to the previous workspace marker.

## Features

- Marks full lines like bookmarks.
- Reflects marker positions on the scrollbar.
- Separates temporary session markers from saved workspace markers.
- Supports marker lists and jump actions from the sidebar.
- Supports CSV export for marker lists.

### Session vs Workspace

| Type | Usage |
| --- | --- |
| Session | Temporary markers used only while VS Code is open |
| Workspace | Markers saved in the workspace and available after restart |

## Sidebar

- Adds `Rinemaca` to the sidebar.
- Shows markers in separate `Session Markers` and `Workspace Markers` groups.

## Settings

Marker colors use `rgba(R, G, B, A)` format. Overview ruler colors are reflected on the scrollbar.

`rinemaca.sessionMarkerBackground`  
Background color for session markers.

`rinemaca.sessionMarkerBorder`  
Border color for session markers.

`rinemaca.sessionMarkerOverviewRuler`  
Overview ruler color for session markers.

`rinemaca.workspaceMarkerBackground`  
Background color for workspace markers.

`rinemaca.workspaceMarkerBorder`  
Border color for workspace markers.

`rinemaca.workspaceMarkerOverviewRuler`  
Overview ruler color for workspace markers.

## Defaults

```json
{
  "rinemaca.sessionMarkerBackground": "rgba(255, 215, 0, 0.22)",
  "rinemaca.sessionMarkerBorder": "rgba(255, 215, 0, 0.85)",
  "rinemaca.sessionMarkerOverviewRuler": "rgba(255, 215, 0, 0.9)",
  "rinemaca.workspaceMarkerBackground": "rgba(64, 156, 255, 0.18)",
  "rinemaca.workspaceMarkerBorder": "rgba(64, 156, 255, 0.85)",
  "rinemaca.workspaceMarkerOverviewRuler": "rgba(64, 156, 255, 0.9)"
}
```

## Development

### PowerShell

```powershell
npm.cmd install
npm.cmd run compile
npm.cmd run package
```

### Command Prompt

```cmd
npm install
npm run compile
npm run package
```

## Other

- This extension was created with Codex.

## License

MIT License
