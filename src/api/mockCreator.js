const profile = {
  name: "林小雅",
  bio: "专业美妆博主｜分享日常护肤与气质妆容｜热爱生活美学",
  avatar: new URL("@/assets/avatar2.png", import.meta.url).href,
  background: new URL("@/assets/avatar3.png", import.meta.url).href
};

const works = [
  {
    id: 1,
    title: "秋日温柔妆容教程",
    likes: 1200,
    image: "https://ai-public.mastergo.com/ai/img_res/3e32598bfbdb92d8dafdfb8c8d52f4fa.jpg"
  },
  {
    id: 2,
    title: "秋冬护肤必备清单",
    likes: 856,
    image: "https://ai-public.mastergo.com/ai/img_res/b875e40666dca800c61685728f2dd0b3.jpg"
  },
  {
    id: 3,
    title: "显白唇妆合集推荐",
    likes: 2100,
    image: "https://ai-public.mastergo.com/ai/img_res/2883c1b63706826aa4fccc91f8bf2abf.jpg"
  },
  {
    id: 4,
    title: "新手眼影配色指南",
    likes: 1500,
    image: "https://ai-public.mastergo.com/ai/img_res/91bf0ddb5300bc2853dac5f69ccf6a6a.jpg"
  },
  {
    id: 5,
    title: "打造无瑕底妆技巧",
    likes: 980,
    image: "https://ai-public.mastergo.com/ai/img_res/50fc0adb5ee3de1b0424d3bc8f910a8a.jpg"
  },
  {
    id: 6,
    title: "美妆工具收纳分享",
    likes: 720,
    image: "https://ai-public.mastergo.com/ai/img_res/8b53a92c68d135247b3f23778be7eab8.jpg"
  }
];

export function fetchCreatorProfile() {
  return Promise.resolve(profile);
}

export function fetchCreatorWorks() {
  return Promise.resolve(works);
}
