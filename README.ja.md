# Rinemaca

Rinemacaは、行マーカーをセッション単位またはワークスペース単位で管理できるVS Code拡張機能です。  
サイドバーでマーカーの一覧表示とCSV出力ができます。

## コマンド
<!-- コマンド行の最後には空白を2ついれること -->

`Rinemaca: Add Session Marker`  
選択行をセッションマーカーとして追加します。

`Rinemaca: Add Workspace Marker`  
選択行をワークスペースマーカーとして追加します。

`Rinemaca: Toggle Session Marker`  
選択行のセッションマーカーを追加または削除します。

`Rinemaca: Toggle Workspace Marker`  
選択行のワークスペースマーカーを追加または削除します。

`Rinemaca: Remove Marker`  
選択行のマーカーを削除します。

`Rinemaca: Clear Session Markers`  
セッションマーカーをすべて削除します。

`Rinemaca: Clear Workspace Markers`  
ワークスペースマーカーをすべて削除します。

`Rinemaca: Export Session Markers`  
セッションマーカーをCSVに出力します。

`Rinemaca: Export Workspace Markers`  
ワークスペースマーカーをCSVに出力します。

`Rinemaca: Next Marker`  
セッションマーカーとワークスペースマーカーの両方を対象に、次のマーカーへ移動します。

`Rinemaca: Previous Marker`  
セッションマーカーとワークスペースマーカーの両方を対象に、前のマーカーへ移動します。

`Rinemaca: Next Session Marker`  
次のセッションマーカーへ移動します。

`Rinemaca: Previous Session Marker`  
前のセッションマーカーへ移動します。

`Rinemaca: Next Workspace Marker`  
次のワークスペースマーカーへ移動します。

`Rinemaca: Previous Workspace Marker`  
前のワークスペースマーカーへ移動します。

## 特徴

- 行全体にマーカーを付けてブックマークのように使えます。
- スクロールバー上にもマーカーが反映されます。
- セッション専用とワークスペース保存の2種類を使い分けられます。
- サイドバーから一覧表示とジャンプができます。
- マーカー一覧はCSVとして書き出せます。

### SessionとWorkspaceの違い

| 種類 | 用途 |
| --- | --- |
| Session | VS Codeを開いている間だけ使う一時的なマーカー |
| Workspace | ワークスペースに保存して、再起動後も確認可能なマーカー |

## サイドバー

- サイドバーに`Rinemaca`を追加します。
- サイドバーには`Session Markers`と`Workspace Markers`の2つに分けてマーカー一覧を表示します。

## 設定

マーカーの色を`rgba(R, G, B, A)`形式で指定します。オーバービューに設定した色はスクロールバーに反映されます。

`rinemaca.sessionMarkerBackground`  
セッションマーカーの背景色  

`rinemaca.sessionMarkerBorder`  
セッションマーカーの枠線色

`rinemaca.sessionMarkerOverviewRuler`  
セッションマーカーのオーバービュー色

`rinemaca.workspaceMarkerBackground`  
ワークスペースマーカーの背景色

`rinemaca.workspaceMarkerBorder`  
ワークスペースマーカーの枠線色

`rinemaca.workspaceMarkerOverviewRuler`  
ワークスペースマーカーのオーバービュー色

## デフォルト値

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

## 開発用

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

## その他

- この拡張機能の作成にはCodexを利用しています。

## ライセンス

MIT License
