function displayStories() {
    const container = document.getElementById('stories-container');
    if (!container) return; // تأكد أنك في الصفحة الرئيسية

    // جلب البيانات من التخزين المحلي (سنستبدلها بـ Firebase لاحقاً)
    const stories = JSON.parse(localStorage.getItem('myStories')) || [];

    // إزالة رسالة التحميل
    container.innerHTML = '';

    if (stories.length === 0) {
        container.innerHTML = `
            <div class="loading">
                <i class="fas fa-bed"></i> لا توجد قصص بعد. اطلب من الأدمن إضافة قصة!
            </div>
        `;
        return;
    }

    // بناء الكروت ديناميكياً
    stories.forEach(story => {
        const card = document.createElement('article');
        card.className = 'story-card';

        card.innerHTML = `
            <h3>${story.title}</h3>
            <p>${story.content}</p>
            <div class="card-footer">
                <span><i class="fas fa-calendar-alt"></i> ${story.date}</span>
            </div>
        `;
        container.appendChild(card);
    });
}

// دالة لعرض العناوين فقط في لوحة التحكم (للإدارة)
function loadAdminStories() {
    const list = document.getElementById('admin-stories-list');
    if (!list) return; // تأكد أنك في صفحة الآدمين

    const stories = JSON.parse(localStorage.getItem('myStories')) || [];
    list.innerHTML = '';

    if (stories.length === 0) {
        list.innerHTML = '<li>لا توجد قصص لعرضها.</li>';
        return;
    }

    stories.forEach(story => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${story.title}</strong>
            <span class="text-muted" style="font-size:0.8em; float:left">${story.date}</span>
        `;
        list.appendChild(li);
    });
}

// تشغيل الدوال عند تحميل الصفحات
window.onload = function() {
    displayStories(); // ستعمل فقط في index.html
    loadAdminStories(); // ستعمل فقط في admin.html
};