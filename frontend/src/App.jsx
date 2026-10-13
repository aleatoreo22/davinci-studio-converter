import { Box, Button, Checkbox, FormControlLabel, createTheme, Stack, TextField, FormLabel } from '@mui/material'
import './App.css'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import { useState } from 'react'
import { NumberField } from '@base-ui/react'
import { Numbers } from '@mui/icons-material'

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  },
})

function BetterCheckbox({ label, description, checked, onChange, sx }) {

  const sx2 = {
    border: 1,
    paddingLeft: "6px",
    paddingRight: "10px",
    paddingBottom: "10px",
    paddingTop: "10px",
    borderRadius: "10px",
    borderColor: "lightBlue",
    backgroundColor: checked ? "#36374d" : "transparent",
    cursor: "pointer",
    ...sx
  }

  return (
    <Stack
      direction="column"
      sx={sx2}
      onClick={() => {
        onChange(!checked)
      }}
    >
      <FormControlLabel
        control={<Checkbox
          checked={checked}
          sx={{ paddingBottom: "0px" }}

          onClick={(e) => {
            e.preventDefault()
          }}

        />}
        label={label}
        onClick={(e) => {
          e.preventDefault()
        }}
      >

      </FormControlLabel>
      <FormLabel sx={{
        marginLeft: "28px",
        fontSize: "14px",
        marginTop: "-8px",
        cursor: "pointer"
      }}>
        {description}
      </FormLabel>
    </Stack >
  )
}

function DirectoryPicker({ label, sx }) {
  return (
    <Stack direction="row" spacing={2} alignItems="flex-end" sx={sx}>

      <TextField variant="standard"
        fullWidth
        label={label}
        style={{
          color: "lightgray",
          fontSize: "20px",
        }} />

      <Box >
        <Button
          variant="contained"
          size="small"
          sx={{ fontSize: "16px", marginTop: "16px" }}>
          <FolderOpenIcon />
        </Button>
      </Box>

    </ Stack>
  )
}

function App() {

  const [videoChecked, setVideoChecked] = useState(false)
  const [audioChecked, setAudioChecked] = useState(true)
  const [audioTracksCount, setAudioTracksCount] = useState(0)

  function changeAudioTrackCount(n) {
    if (audioTracksCount + n < 0) return
    setAudioTracksCount(audioTracksCount + n)
  }

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            minHeight: '100vh',
            p: 2,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column'
          }}>

          <div style={{ fontWeight: "bold" }}>
            Path
          </div>

          <DirectoryPicker label={"Input file"} sx={{ marginTop: "16px" }} />

          <DirectoryPicker label={"Output folder"} sx={{ marginTop: "16px" }} />

          <div style={{ fontWeight: "bold", marginTop: "16px" }}>
            Convert
          </div>

          <Stack direction="row" sx={{ marginTop: "16px" }}>
            <BetterCheckbox
              label="Video"
              description={"Convert video to..."}
              checked={videoChecked}
              onChange={setVideoChecked}
            />
            <BetterCheckbox
              label="Audio"
              description={"Convert audio tracks to..."}
              sx={{ marginLeft: "10px" }}
              checked={audioChecked}
              onChange={setAudioChecked}
            />
          </Stack>

          {audioChecked ?
            <Box
              direction="row"
              sx={{
                border: 1,
                paddingLeft: "6px",
                marginTop: "16px",
                paddingRight: "10px",
                paddingBottom: "10px",
                paddingTop: "10px",
                borderRadius: "10px",
                borderColor: "lightBlue",
                display: "flex",
              }}>

              <Stack>
                <div style={{
                  fontWeight: "bold"
                }}>
                  AudioTracks
                </div>
                <FormLabel sx={{ fontSize: "14px" }}>
                  How many tracks to convert
                </FormLabel>
              </Stack>

              <Box sx={{ display: "flex", justifyContent: "flex-end", width: "94vh" }}>
                <Button
                  variant='contained'
                  size='small'
                  onClick={() => changeAudioTrackCount(-1)}
                >
                  -
                </Button>
                <div style={{ fontWeight: "bold" }}>
                  {audioTracksCount}
                </div>
                <Button variant='contained'
                  size='small'
                  onClick={() => changeAudioTrackCount(+1)}
                >
                  +
                </Button>
              </Box>

            </Box>
            :
            <> </>}

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Stack direction="row">
              <Button
                variant="contained"
                size="medium"
                sx={{ fontSize: "16px", marginTop: "16px", textTransform: "none" }}>
                Convert
              </Button>
            </Stack>
          </Box>

        </Box>
      </ThemeProvider >
    </>
  )
}

export default App
