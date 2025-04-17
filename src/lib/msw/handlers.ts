import { http } from "msw";

export const handlers = [
  http.get("/api/faq", () => {
    const data = [
      {
        id: 1,
        question: "회원가입은 어떻게 하나요?",
        answer: "우측 상단 '회원가입' 버튼을 눌러주세요.",
        category: "회원",
      },
    ];
    return Response.json(data);
  }),
];
