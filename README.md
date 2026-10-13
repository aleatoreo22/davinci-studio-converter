# DaVinci Studio Converter

Conversor **automático de vídeo e áudio** para **DaVinci Resolve**.

- **Go** — orquestração, lógica de negócio e execução dos comandos do `ffmpeg`.
- **C++ com Qt** — camada de renderização nativa (janela, WebView) e execução de comandos.
- **React** — frontend (interface do usuário) renderizado dentro da janela Qt.

---

## Funcionalidades

- **Selecionar arquivo de entrada** — arquivo de vídeo/áudio de origem.
- **Selecionar pasta de saída** — destino dos arquivos convertidos.
- **Converter vídeo** (opcional) — transcodificação do stream de vídeo para um
  formato compatível com o Resolve (MPEG-4 / `.m4v`), com bitrate configurável
  (padrão: `10M`).
- **Extrair áudio** (opcional) — separa cada faixa de áudio em um arquivo WAV
  individual (`audio0.wav`, `audio1.wav`, ...).
- **Definir quantidade de faixas de áudio** a serem extraídas.
- **Conversão combinada** — é possível converter vídeo e extrair áudio na mesma
  execução.
- **Criação automática da pasta de saída**, caso não exista.

---

## Arquitetura

- O **frontend React** é servido no desenvolvimento pelo Vite
  (`http://localhost:5173`) e carregado dentro de um `QWebView`.
- A **janela e o WebView** são criados em C++ (Qt) e expostos ao Go via **SWIG**.
- O **Go** concentra a lógica e dispara os processos do `ffmpeg`/`ffprobe`.

---

## Tecnologias

| Camada         | Tecnologia                                                    |
| -------------- | ------------------------------------------------------------- |
| Backend        | Go 1.27+                                                      |
| Renderização   | C++ + Qt 6 (Widgets, Gui, Core, WebView)                      |
| Ponte Go ⇄ C++ | SWIG 4.x                                                      |
| Frontend       | React 19 + Vite + Material UI (MUI) + Base UI                 |
| Conversão      | `ffmpeg` / `ffprobe`                                          |

---

## Requisitos

- **Go** 1.27 ou superior
- **Qt 6** 
- **SWIG** 4.x
- **Node.js** e **npm**
- **ffmpeg** 

---

## Como rodar (desenvolvimento)

### 1. Frontend

```bash
cd frontend
npm install
npm run dev        # sobe o Vite em http://localhost:5173
```

### 2. Aplicação desktop (Go + Qt)

Em outro terminal:

```bash
cd gcron
make run           
```

```bash
swig -go -c++ cpp/qt.i
QT_QPA_PLATFORM=xcb go run main.go
```

A janela abre apontando para o servidor do Vite (`http://localhost:5173/`).

---
