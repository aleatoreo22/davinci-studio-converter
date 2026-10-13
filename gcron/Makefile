swig:
	swig -go -c++ cpp/qt.i

run: swig
	QT_QPA_PLATFORM=xcb	go run main.go
