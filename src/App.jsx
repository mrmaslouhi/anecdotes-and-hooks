import { useState } from 'react'
import {
  Routes,
  Route,
  Link,
  useMatch
} from 'react-router-dom'

const Menu = ({ anecdotes }) => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to="/" style={padding}>Anecdotes</Link>
      <Link to="/post" style={padding}>Post new</Link>
      <Link to="/about" style={padding}>About</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} ><Link to={`/anecdote/${anecdote.id}`}>{anecdote.content}</Link></li>)}
    </ul>
  </div>
)

const SingleAnecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <p>has {anecdote.votes} votes</p>
      <span>for more info see <a href={anecdote.info}>{anecdote.info}</a></span>
    </div>
  )
}

const About = () => (
  <div>
    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const PostNew = (props) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
  }

  return (
    <div>
      <h2>post a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          author
          <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
          <input name='info' value={info} onChange={(e)=> setInfo(e.target.value)} />
        </div>
        <button>post</button>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useMatch('/anecdotes/:id')
  const anecdote = match ? anecdoteById(Number(match.params.id)) : null
  console.log(typeof anecdote)
  console.log(anecdote)
  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu anecdotes={anecdotes} />
      <Routes>
        <Route path='/anecdotes/:id' element={<SingleAnecdote anecdote={anecdote} /> } />
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path='/post' element={<PostNew addNew={addNew} />} />
        <Route path='/about' element={<About />} />
      </Routes>
      <br />
      <Footer />
    </div>
  )
}

export default App
