/**
 * 爱迪厚德（北京）管理咨询有限公司 — 交互脚本
 * 功能：导航高亮、菜单切换、案例筛选、表单处理、滚动渐入
 */

// ==================== Header 滚动效果 ====================
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 80) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    lastScroll = scrollY;
});

// ==================== 移动端菜单 ====================
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
});

// 点击导航链接后关闭菜单
nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// ==================== 导航高亮（滚动监听） ====================
const sections = document.querySelectorAll('section[id]');
const navLinks = nav.querySelectorAll('a:not(.nav-cta)');

function updateActiveNav() {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

// ==================== 案例筛选 ====================
const filterBtns = document.querySelectorAll('.filter-btn');
const caseCards = document.querySelectorAll('.case-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // 按钮状态
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        caseCards.forEach(card => {
            if (filter === 'all' || card.dataset.type === filter) {
                card.style.display = 'block';
                card.style.opacity = '0';
                requestAnimationFrame(() => {
                    card.style.opacity = '1';
                });
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ==================== 联系表单提交 ====================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.textContent;

        btn.textContent = '提交中...';
        btn.disabled = true;

        // 模拟提交（实际部署后需要对接后端或表单服务）
        setTimeout(() => {
            btn.textContent = '提交成功 ✓';
            btn.style.background = '#4caf50';
            btn.style.color = 'white';

            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
                btn.style.background = '';
                btn.style.color = '';
                contactForm.reset();
            }, 3000);
        }, 1500);
    });
}

// ==================== 滚动渐入动画 ====================
const observerOptions = {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 观察需要动画的元素
const animateElements = document.querySelectorAll(
    '.service-card, .case-card, .team-card, .insight-card, ' +
    '.why-item, .process-step, .about-feature, .hero-stat'
);

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// Hero 区域的统计数字也渐入
document.querySelectorAll('.hero-stat').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(12px)';
    el.style.transition = 'opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s';
    observer.observe(el);
});

// 控制台打个招呼
console.log('🏛 爱迪厚德（北京）管理咨询有限公司');
console.log('🌐 ideaholder.top — 做优秀思想的持有者与践行者');
