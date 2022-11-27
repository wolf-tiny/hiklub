import React, {
  useState,
  useCallback,
  useEffect
} from 'react'
import {
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Button,
  Grid,
  Typography,
  TextField,
  Box
} from '@mui/material'

import Graph from './components/Graph'

const arrData = new Array(15).fill(0).map((content, index) => {
  return { id: index + 1, title: `question${index + 1}`, value: ["1", "2", "3", "4"] }
})

const App = () => {
  const [value, setValue] = useState(0)
  const [error, setError] = useState(false)
  const [helperText, setHelperText] = React.useState('Choose one')

  const [name, setName] = useState('')
  const [info, setInfo] = useState(JSON.parse(localStorage.getItem('quiz')))
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('quiz')) !== null) {
      setIndex(JSON.parse(localStorage.getItem('quiz')).status)
    }
  }, [])

  useEffect(() => {
    setInfo(JSON.parse(localStorage.getItem('quiz')))
  }, [index])

  const handleEmail = useCallback(() => {
    setInfo({ 'name': name })
  }, [name])

  const handleName = useCallback((e) => {
    localStorage.setItem('quiz', JSON.stringify({ 'name': e.target.value, status: 0 }))
    setName(e.target.value)
  }, [])

  const handleRadioChange = useCallback((event) => {
    setValue(event.target.value)
    setHelperText(' ')
    setError(false)
  }, [])

  const handleRestart = useCallback(() => {
    localStorage.clear()
    setInfo(null)
    setName('')
    setIndex(0)
  }, [])

  const handleSubmit = useCallback((event) => {
    event.preventDefault()

    if (value === 0) {
      setHelperText('Please select an option.')
      setError(true)
    } else {
      if (index === 15) {

      } else {
        localStorage.setItem('quiz', JSON.stringify({ ...info, status: index + 1, [index]: value }))
        setIndex(index + 1)
        setHelperText('Choose one')
        setValue(0)
      }
    }
  }, [index, info, value])

  return (
    <Grid container justifyContent="center" sx={{ display: 'grid' }} spacing={2} mt={10}>
      {info === null ? <form onSubmit={handleEmail}>
        <TextField
          onChange={handleName}
          sx={{ marginTop: 30 }}
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Next
        </Button>
      </form> : <Box sx={{ width: 500 }}>
        <Box display={'flex'}>
          <Box margin={'auto'} mb={5} alignItems={'self-end'} display={'flex'}>
            <Typography variant="h1">
              Quiz
            </Typography>
            <Typography variant='h5'>
              &nbsp;{info.name}
            </Typography>
          </Box>
        </Box>
        <Box justifyContent="center">
          {index >= 15 ? <>
            <Box sx={{ width: 400 }}>
              <Graph />
              <Box sx={{ display: 'flex' }}>
                <Button sx={{ margin: 'auto', marginTop: 2 }} variant="outlined" onClick={handleRestart}>
                  RESTART
                </Button>
              </Box>
            </Box>
          </> : <Box alignItems={'center'}>
            <form onSubmit={handleSubmit}>
              <FormControl sx={{ m: 3 }} fullWidth error={error} variant="standard">
                <FormLabel id="demo-error-radios" sx={{ marginBottom: 1, fontSize: 20, fontWeight: 'bold' }}>{arrData[index].title}</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-error-radios"
                  name="quiz"
                  value={value}
                  onChange={handleRadioChange}
                >
                  {arrData[index].value.map((content) => {
                    return <FormControlLabel key={content} value={content} control={<Radio />} label={'number ' + content} />
                  })}
                </RadioGroup>
                <FormHelperText>{helperText}</FormHelperText>
                <Box display={'flex'}>
                  <Button sx={{ margin: 'auto', marginTop: 2 }} type="submit" variant="outlined">
                    {index === 14 && value !== 0 ? 'RESULT' : 'NEXT'}
                  </Button>
                </Box>
              </FormControl>
            </form>
          </Box>}
        </Box>
      </Box>
      }
    </Grid>
  )
}

export default App