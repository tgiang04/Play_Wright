const { chromium } = require('playwright');

(async () => {
    // Khởi tạo trình duyệt và trang mới
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    // 1. Mở trang Facebook
    await page.goto('https://www.facebook.com');

    // 2. Điền email hoặc số điện thoại vào ô input
    await page.fill('input[name="email"]', 'giang220804@gmail.com');

    // 3. Điền mật khẩu vào ô input
    await page.fill('input[name="pass"]', 'clone');

    // 4. Nhấn nút đăng nhập
    await page.click('button[name="login"]');

    // 5. Chờ điều hướng sau khi đăng nhập
    await page.waitForNavigation();

    // 6. Kiểm tra xem đã đăng nhập thành công hay chưa bằng cách kiểm tra sự xuất hiện của một phần tử trên trang chủ
    const loginSuccess = await page.isVisible('div[aria-label="Create a post"]');
    console.log(`Login success: ${loginSuccess}`);

    // 7. Nhấn vào biểu tượng profile để mở trang cá nhân
    await page.click('div[aria-label="Account"]');
    await page.click('a[aria-label="Profile"]');

    // 8. Chờ trang cá nhân tải xong
    await page.waitForSelector('div[data-pagelet="ProfileTimeline"]');

    // 9. Kiểm tra thông tin hiển thị trên trang cá nhân
    const profileName = await page.textContent('h1');
    console.log(`Profile name: ${profileName}`);

    // 10. Nhấn vào phần "About" để xem thông tin cá nhân
    await page.click('a[data-tab-key="about"]');

    // 11. Chờ trang "About" tải xong
    await page.waitForSelector('div[data-pagelet="ProfileTilesFeed_0"]');

    // 12. Kiểm tra thông tin hiển thị trên trang "About"
    const aboutInfo = await page.textContent('div[data-pagelet="ProfileTilesFeed_0"]');
    console.log(`About Info: ${aboutInfo}`);

    // 13. Nhấn vào phần "Friends" để xem danh sách bạn bè
    await page.click('a[data-tab-key="friends"]');

    // 14. Chờ trang "Friends" tải xong
    await page.waitForSelector('div[data-pagelet="ProfileAppSection_0"]');

    // 15. Kiểm tra danh sách bạn bè
    const friendsList = await page.textContent('div[data-pagelet="ProfileAppSection_0"]');
    console.log(`Friends List: ${friendsList}`);

    // Đóng trình duyệt
    await browser.close();
})();
