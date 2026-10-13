#include <QApplication>
#include <QUrl>
#include <QVBoxLayout>
#include <QWebView>
#include <QWidget>
#include <QWindow>
#include <QtWebView>
#include <string>

void setWebViewConfig(QWebView *w) {
  auto *s = w->settings();
  s->setAttribute(QWebViewSettings::WebAttribute::JavaScriptEnabled, true);
  s->setAttribute(QWebViewSettings::WebAttribute::LocalStorageEnabled, true);
}

void setFixedWindowSize(int width, int height, QWidget *window) {
  window->setMaximumHeight(height);
  window->setMinimumHeight(height);
  window->setMaximumWidth(width);
  window->setMinimumWidth(width);
}

struct WindowProps {
  int width;
  int height;
  bool resizable;
  std::string baseUrl;
};

int CreateWindow(WindowProps props) {
  int argc = 1;
  char *argv[1];

  argv[0] = (char *)"gcron";

  QCoreApplication::setOrganizationName("QtExamples");
  QApplication app(argc, argv);
  QtWebView::initialize();

  QWidget window;
  window.resize(props.width, props.height);

  if (!props.resizable) {
    setFixedWindowSize(props.width, props.height, &window);
  }

  QWebView *webView = new QWebView();
  setWebViewConfig(webView);

  auto *container = QWidget::createWindowContainer(webView, &window);
  auto *layout = new QVBoxLayout(&window);
  layout->setContentsMargins(0, 0, 0, 0);
  layout->addWidget(container);

  const QUrl *url = new QUrl(QString::fromStdString(props.baseUrl));
  webView->setUrl(*url);

  window.setLayout(layout);
  window.show();

  return app.exec();
}
