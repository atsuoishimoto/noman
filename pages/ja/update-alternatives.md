# update-alternatives コマンド

alternatives システムでデフォルトコマンドを決定するシンボリックリンクを管理します。

## 概要

`update-alternatives` は、ユーザーが特定のコマンド名を入力したときに実行されるコマンドを決定するシンボリックリンクの作成、削除、管理、および情報表示を行います。これは Debian の alternatives システムの一部で、同じプログラムの複数のバージョンが共存し、そのうちの1つをデフォルトとして指定できるようにします。

## オプション

### **--install**

新しい alternative リンクグループを作成します

```console
$ sudo update-alternatives --install /usr/bin/editor editor /usr/bin/vim 50
update-alternatives: /usr/bin/vim を提供するために /usr/bin/editor (editor) を自動モードで使用します
```

### **--config**

リンクグループに使用する alternative を設定します

```console
$ sudo update-alternatives --config editor
editor の alternative は 3 個あります (which provide /usr/bin/editor)。

  選択肢    パス                優先度   状態
------------------------------------------------------------
* 0            /usr/bin/vim         50        自動モード
  1            /usr/bin/emacs       40        手動モード
  2            /usr/bin/nano        30        手動モード
  3            /usr/bin/vim         50        手動モード

現在の選択[*]を保持するには Enter、さもなければ選択肢の番号のキーを押してください:
```

### **--display**

リンクグループに関する情報を表示します

```console
$ update-alternatives --display editor
editor - 自動モード
  最適バージョンへのリンクは /usr/bin/vim です
  リンクは現在 /usr/bin/vim を指しています
  リンク editor は /usr/bin/editor です
  スレーブ editor.1.gz は /usr/share/man/man1/editor.1.gz です
  スレーブ editor.fr.1.gz は /usr/share/man/fr/man1/editor.1.gz です
  /usr/bin/emacs - 優先度 40
  /usr/bin/nano - 優先度 30
  /usr/bin/vim - 優先度 50
```

### **--remove**

リンクグループから alternative を削除します

```console
$ sudo update-alternatives --remove editor /usr/bin/emacs
update-alternatives: 自動モードから editor (/usr/bin/emacs) を削除しています
```

### **--set**

特定の alternative を選択済みとしてリンクグループに設定します

```console
$ sudo update-alternatives --set editor /usr/bin/nano
update-alternatives: /usr/bin/nano を提供するために /usr/bin/editor (editor) を手動モードで使用します
```

### **--auto**

リンクグループを自動モードに設定します（最も優先度の高い alternative が使用されます）

```console
$ sudo update-alternatives --auto editor
update-alternatives: /usr/bin/vim を提供するために /usr/bin/editor (editor) を自動モードで使用します
```

## 使用例

### Java alternatives の設定

```console
$ sudo update-alternatives --install /usr/bin/java java /usr/lib/jvm/java-11-openjdk/bin/java 1100
update-alternatives: /usr/lib/jvm/java-11-openjdk/bin/java を提供するために /usr/bin/java (java) を自動モードで使用します

$ sudo update-alternatives --install /usr/bin/java java /usr/lib/jvm/java-8-openjdk/bin/java 1000
update-alternatives: /usr/lib/jvm/java-11-openjdk/bin/java を提供するために /usr/bin/java (java) を自動モードで使用します

$ sudo update-alternatives --config java
java の alternative は 2 個あります (which provide /usr/bin/java)。

  選択肢    パス                                      優先度   状態
------------------------------------------------------------
* 0            /usr/lib/jvm/java-11-openjdk/bin/java     1100      自動モード
  1            /usr/lib/jvm/java-8-openjdk/bin/java      1000      手動モード
  2            /usr/lib/jvm/java-11-openjdk/bin/java     1100      手動モード

現在の選択[*]を保持するには Enter、さもなければ選択肢の番号のキーを押してください:
```

### コマンドで利用可能な alternatives を確認する

```console
$ update-alternatives --list editor
/usr/bin/emacs
/usr/bin/nano
/usr/bin/vim
```

## ヒント

### 優先度の値について理解する

優先度の値が高いほど（例えば50より100の方が）、自動モードで選択される可能性が高くなります。alternatives を設定する際は、優先するバージョンに高い数値を割り当ててください。

### 関連コマンドのグループ管理

複数のコマンド（Javaのjava、javac、jarなど）を持つプログラムの場合、すべてのツールで一貫したバージョン管理を確保するために、各コマンドの alternatives を作成してください。

### 自動モードと手動モード

自動モードでは、システムは最も優先度の高い alternative を選択します。手動モードでは、より高い優先度の alternative が後でインストールされても、選択した選択肢が維持されます。

### スレーブリンク

関連ファイル（メインの alternative と一緒に変更されるべきマニュアルページなど）を管理するには、スレーブリンク（`--slave` オプション付き）を使用してください。

## よくある質問

#### Q1. 自動モードと手動モードの違いは何ですか？
A. 自動モードでは、システムは最も優先度の高い alternative を選択します。手動モードでは、明示的に変更するまで選択した選択肢が維持されます。

#### Q2. コマンドで利用可能なすべての alternatives を確認するにはどうすればよいですか？
A. `update-alternatives --list コマンド名` を使用してすべての alternatives を確認するか、`update-alternatives --display コマンド名` でより詳細な情報を確認できます。

#### Q3. alternative を完全に削除するにはどうすればよいですか？
A. `update-alternatives --remove リンク名 パス` を使用して、グループから特定の alternative を削除します。

#### Q4. alternatives をインストールする際にどの優先度の数値を使用すべきですか？
A. 優先度は任意の整数です。高い数値（100など）は低い数値（10など）よりも優先度が高くなります。優先順位を反映した値を選択してください。

## 参考資料

https://manpages.debian.org/bullseye/dpkg/update-alternatives.1.en.html

## 改訂履歴

- 2025/05/05 初版