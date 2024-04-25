export default function getPost(req, res) {
    res.render('posts', {
        templateName: 'posts.controller.js',
        templateContent: '본문의 내용입니다.',
    });
}
