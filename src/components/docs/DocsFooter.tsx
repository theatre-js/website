import { FC, useMemo, useState } from 'react'
import Link from 'next/link'
import { Icon } from '../common/Icon'
import { format } from 'date-fns'
import { Doc } from 'contentlayer/generated'

const githubBranch = 'main'
const githubBaseUrl = `https://github.com/theatre-js/website/blob/${githubBranch}/content/`

export const DocsFooter: FC<{ doc: Doc }> = ({ doc }) => {
  return (
    <>
      <hr />
      <div className="flex items-start justify-between space-y-0 text-sm">
        <p className="m-0">
          <PageFeedback />
        </p>
        <p className="m-0 text-right">
          Last edited on {format(new Date(doc.last_edited), 'MMMM dd, yyyy')}.<br />
          <Link href={githubBaseUrl + doc._raw.sourceFilePath}>
            <a className="inline-flex items-center space-x-1" target="_blank" rel="noreferrer">
              <span className="inline-block w-4">
                <Icon name="github" />
              </span>
              <span>Edit this page</span>
            </a>
          </Link>
        </p>
      </div>
    </>
  )
}

function PageFeedback(props: {}) {
  const FeedbackButton = (props: {
    sentiment: string
    sentimentText: string
    feedback: Feedback
    positive?: boolean
    title?: string
  }) => {
    return (
      <button
        className="mr-2 text-lg"
        title={props.title}
        onClick={() => props.feedback.submit(props.sentimentText, !!props.positive)}
      >
        {props.sentiment}
      </button>
    )
  }

  const feedback = useFeedback()

  return feedback.state == null ? (
    <>
      Was this article helpful to you? <br />
      <FeedbackButton sentiment="😫" sentimentText="emoji-distraught" feedback={feedback} />
      <FeedbackButton sentiment="😕" sentimentText="emoji-confused" feedback={feedback} />
      <FeedbackButton sentiment="😀" sentimentText="emoji-happy" feedback={feedback} positive />
      <FeedbackButton sentiment="🤩" sentimentText="emoji-stareyes" feedback={feedback} positive />
    </>
  ) : feedback.state.state === 'loading' ? (
    <>Loading</>
  ) : feedback.state.state === 'error' ? (
    <>Error submitting feedback</>
  ) : feedback.state.state === 'submitted' ? (
    <>
      {feedback.state.positive ? (
        <>Thank you for your feedback. We are always trying to improve how easy it is to use Theatre.js</>
      ) : (
        <>
          Thank you for your feedback, we would love to learn more by asking you to submit an issue for this page.
          &nbsp;
          <Link href="https://github.com/theatre-js/theatre/issues">
            <a className="inline-flex items-center space-x-1" target="_blank" rel="noreferrer">
              <span className="inline-block w-4">
                <Icon name="github" />
              </span>
              <span>Provide feedback</span>
            </a>
          </Link>
        </>
      )}
    </>
  ) : (
    <>Unknown error</>
  )
}

type Feedback = ReturnType<typeof useFeedback>

function useFeedback() {
  const [state, setState] = useState<null | {
    time: number
    submissionId: string
    state: 'loading' | 'submitted' | 'error'
    positive: boolean
  }>(null)

  return {
    state,
    submit(sentiment: string, positive: boolean) {
      setState((prev) => {
        if (prev) {
          const doubleClicked = prev.time + 500 > Date.now()
          if (doubleClicked) {
            console.warn("appears to be a double click so we didn't submit feedback")
            return prev
          }
        }

        // create new feedback submission

        const time = Date.now()
        const submissionId = time.toString(36) + '_' + Math.random().toString(36).slice(2, 6)
        const setResult = (result: 'error' | 'submitted') =>
          setState((curr) => {
            if (curr?.submissionId !== submissionId) {
              // apparently we overwrote prev submission, so ignore result of this
              return curr
            }

            return {
              state: result,
              submissionId,
              time,
              positive,
            }
          })

        submitFeedbackToServer({
          sentiment,
          submissionId, // TODO: submission id for follow-on attach more info linking
        })
          .then(() => {
            setResult('submitted')
          })
          .catch(() => {
            setResult('error')
          })

        return {
          state: 'loading',
          submissionId,
          time,
          positive,
        }
      })
    },
  }
}

async function submitFeedbackToServer(data: { sentiment: string; submissionId: string }) {
  const bodyJSON = {
    page_origin: location.origin,
    page_path: location.pathname,
    page_href: location.href,
    user_sentiment: data.sentiment,
    submission_id: data.submissionId,
    time: Date.now(),
  }

  // TODO: Why wasn't the line below working?
  // const docsFeedbackUrl = process.env.DOCS_FEEDBACK_URL || ''

  // const docsFeedbackUrl = 'http://localhost:3003/docs/feedback'
  const docsFeedbackUrl = 'https://updates.theatrejs.com/docs/feedback'
  if (!docsFeedbackUrl) console.error('DOCS_FEEDBACK_URL env var is not set.')

  return fetch(docsFeedbackUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyJSON),
  })
}
