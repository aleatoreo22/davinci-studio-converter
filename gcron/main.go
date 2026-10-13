package main

import (
	"fmt"

	qt "github.com/aleatoreo22/davinci-studio-converter/cpp"
)

type Window struct {
	width     int
	height    int
	resizable bool
	baseUrl   string
}

func (w Window) Show() {
	props := qt.NewWindowProps()

	props.SetHeight(w.height)
	props.SetWidth(w.width)
	props.SetResizable(w.resizable)
	props.SetBaseUrl(w.baseUrl)

	qt.CreateWindow(props)
}

func CreateWindow(width int, height int, resizable bool, baseUrl string) *Window {
	return &Window{
		width,
		height,
		resizable,
		baseUrl,
	}
}

func main() {
	fmt.Println("Hello world")
	window := CreateWindow(800, 600, false, "http://localhost:5173/")
	window.Show()
}
