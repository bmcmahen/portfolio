import React from 'react'
import './Github.css'
import { ListSummary } from './ListSummary'

const getURL = (username, repo) =>
  `https://api.github.com/repos/${username}/${repo}`

async function fetchGithubRepo(username, repo) {
  try {
    const res = await fetch(getURL(username, repo))
    if (res.ok) {
      const json = await res.json()
      return json
    } else {
      throw new Error('Unable to fetch github profile')
    }
  } catch (err) {
    console.error(err)
    throw err
  }
}

export class Github extends React.Component {
  static defaultProps = {
    username: 'bmcmahen',
    repos: [],
  }

  state = {
    repos: [],
    loading: false,
    error: false,
  }

  componentDidMount = async () => {
    this.setState({ loading: true, error: false })
    try {
      const promises = this.props.repos.map(repo =>
        fetchGithubRepo(this.props.username, repo)
      )
      const results = await Promise.all(promises)
      this.setState({
        repos: results,
        loading: false,
      })
    } catch (err) {
      this.setState({ loading: false, error: true })
    }
  }

  render() {
    return (
      <ListSummary
        title="Open source"
        subtitle={
          <div>
            I love contributing open source! Be sure to check out my{' '}
            <a href="http://github.com/bmcmahen">Github profile</a> for all of
            my work.
          </div>
        }
      >
        <div className="Github">{this.renderContent()}</div>
      </ListSummary>
    )
  }

  renderContent() {
    if (this.state.repos.length > 0) {
      return this.state.repos.map(repo => {
        return (
          <a href={repo.html_url} className="Github__repo" key={repo.id}>
            <div className="Github__meta">
              <strong>{repo.name}</strong>
              <div>{repo.description}</div>
            </div>
            <div className="Github__star">
              <div className="Github__star_count">{repo.stargazers_count}</div>
              <Star />
            </div>
          </a>
        )
      })
    }

    if (this.state.error) {
      return null
    }

    return <div>Loading...</div>
  }
}

const Star = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-star"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)
