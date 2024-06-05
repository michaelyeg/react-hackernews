import React, { useEffect, useState } from 'react';
import './JobFeed.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import JobDetail from './JobDetail';
import Button from 'react-bootstrap/Button';

// GET API = `https://hacker-news.firebaseio.com/v0/jobstories.json`;
// Metadata GET API = https://hacker-news.firebaseio.com/v0/item/YOUR_POST_ID_HERE.json`
interface JobFeed {
  by: string;
  id: number;
  score: number;
  title: string;
  time: number;
  postedBy: string;
  type: string;
  url: string;
}

const JobFeed = () => {
  const feedUrl = 'https://hacker-news.firebaseio.com/v0/jobstories.json';
  const feedUrlSingle = 'https://hacker-news.firebaseio.com/v0/item/';
  const [feedIdList, setFeedIdList] = useState<number[]>([]);
  const [jobFeeds, setJobFeeds] = useState<JobFeed[]>([]);

  useEffect(() => {
    axios.get(feedUrl).then((response) => {
      if (response.status === 200) setFeedIdList(response.data);
    });
  }, []);

  useEffect(() => {
    if (feedIdList.length > 0) {
      loadFeed(0);
    }
  }, [feedIdList]);

  const loadFeed = (start: number) => {
    for (let i = start; i < Math.min(start + 5, feedIdList.length); i++) {
      axios
        .get(feedUrlSingle + String(feedIdList[i]) + '.json')
        .then((response) => {
          console.log(response.data);
          if (response.status === 200)
            setJobFeeds((prevFeed) => [...prevFeed, response.data]);
        });
    }
  };

  const loadMoreFeed = () => {
    loadFeed(jobFeeds.length);
  };

  return (
    <div className="container">
      <h1 className='header'>Hackernews Jobs</h1>
      <p style={{ fontWeight: '200', textAlign: 'center' }}>
        React the problem statement to start writing your code.
      </p>
      <div className="container">
        <div className="row">
          {jobFeeds.map((job) => (
            <div className="col-6">
              <JobDetail
                id={job.id}
                title={job.title}
                time={job.time}
                postedBy={job.by}
              />
            </div>
          ))}
          <Button
            onClick={loadMoreFeed}
            disabled={jobFeeds.length === feedIdList.length}
          >
            Load more
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobFeed;
