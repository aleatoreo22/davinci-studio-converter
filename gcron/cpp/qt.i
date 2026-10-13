/* File : qt.i */
%module qt

%include <std_string.i>

%inline %{
#include <QApplication>
#include <QWindow>
#include <QWidget>
#include <QtWebView>
#include <string>

struct WindowProps {
  int width;
  int height;
  bool resizable;
  std::string baseUrl;
};

extern int CreateWindow(WindowProps props);
%}

