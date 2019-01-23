import React from 'react'
import './Github.css'
import { ListSummary } from './ListSummary'
import { ListItem } from './ListItem'

export class Github extends React.Component {
  static defaultProps = {
    username: 'bmcmahen',
    repos: [],
  }

  render() {
    return (
      <ListSummary title="Open source">
        <div className="Github">{this.renderContent()}</div>
        <div className="Index__show-more-container">
          <a
            href="http://github.com/bmcmahen"
            onClick={() =>
              this.setState({
                renderTotal: this.state.renderTotal + 10,
              })
            }
            className="Index__show_more"
          >
            More on GitHub
          </a>
        </div>
      </ListSummary>
    )
  }

  renderContent() {
    return this.props.repos.map(repo => {
      const { node } = repo

      return (
        <ListItem
          title={node.name}
          subtitle={node.description}
          href={node.url}
          className="Github__repo"
          key={node.name}
        >
          <div className="Github__star">
            <div className="Github__star_count">
              {node.stargazers.totalCount}
            </div>
            <Star />
          </div>
        </ListItem>
      )
    })
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
