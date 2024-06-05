import React, { useEffect, useState } from 'react';

export default function JobDetail({
  id,
  title,
  time,
  postedBy,
  url
}: {
  id: number;
  title: string;
  time: number;
  postedBy: string;
  url?: string;
}) {
  const date = new Date(time * 1000);

  // Format the date
  const formattedDate = date.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div>
      <p>ID: <a href={url} target={'_blank'}>{id}</a></p>
      <h2>{title}</h2>
      <p>{formattedDate}</p>
      <p>Posted by: {postedBy}</p>
    </div>
  );
}
