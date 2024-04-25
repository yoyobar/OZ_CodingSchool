export default function getImage(req, res) {
    res.render('index', {
        imageTitle: '이 데이터는 images.controller.js에서 오고 있습니다.',
    });
}
