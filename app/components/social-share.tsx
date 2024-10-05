"use client";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  FacebookShareCount,
  InstapaperIcon,
  InstapaperShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
  ViberIcon,
  ViberShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";

interface SocialShareProps {
  url: string;
  hashtag?: string;
}

export const SocialShare = ({ url, hashtag }: SocialShareProps) => {
  return (
    <div className="dark:border-slate-600 dark:bg-slate-900 bg-sky-50 flex gap-3 p-4 dark:border-2">
      <span className="text-slate-600 text-xl font-semibold">
        Share this tour
      </span>
      <FacebookShareButton
        title="Hello"
        url={url}
        hashtag={hashtag}
        className="flex flex-col"
      >
        <FacebookIcon round size={30} />
        <FacebookShareCount url={url} />
      </FacebookShareButton>
      <TwitterShareButton url={url}>
        <XIcon round size={30} />
      </TwitterShareButton>
      <RedditShareButton url={url}>
        <RedditIcon round size={30} />
      </RedditShareButton>
      <WhatsappShareButton url={url}>
        <WhatsappIcon round size={30} />
      </WhatsappShareButton>
      <ViberShareButton url={url}>
        <ViberIcon round size={30} />
      </ViberShareButton>
    </div>
  );
};
