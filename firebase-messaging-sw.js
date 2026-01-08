// ===============================
// كود الحصول على FCM Token - الإصدار النهائي
// ===============================

// تأكد من تحميل Firebase أولاً
if (typeof firebase === 'undefined') {
    console.log('📦 جارٍ تحميل Firebase SDK...');
    
    // تحميل Firebase App
    const script1 = document.createElement('script');
    script1.src = 'https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js';
    document.head.appendChild(script1);
    
    // تحميل Firebase Messaging
    const script2 = document.createElement('script');
    script2.src = 'https://www.gstatic.com/firebasejs/12.7.0/firebase-messaging.js';
    document.head.appendChild(script2);
    
    // انتظار التحميل
    await new Promise(resolve => setTimeout(resolve, 2000));
}

// تهيئة Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCYbDqGBlBEEDGNfXbAbsS4sZupNDb7jrY",
    authDomain: "system-306.firebaseapp.com",
    projectId: "system-306",
    storageBucket: "system-306.firebasestorage.app",
    messagingSenderId: "471316495588",
    appId: "1:471316495588:web:4d7ba9be7fea17c7a8c0f1",
    measurementId: "G-T4RTTBWHKL"
};

try {
    const app = firebase.initializeApp(firebaseConfig);
    const messaging = firebase.messaging(app);
    
    console.log('✅ Firebase مهيأ بنجاح');
    
    // VAPID Key (استخدم المفتاح من Firebase Console)
    const vapidKey = "BCzZR6B_2ttK-G4KURsQcwPuoZ22rP7H4fEpvNp7Y-9VqlbXqWduYpzVG_gJAgge0jQ6WqmBcQo4ZtHlHyKCNcY";
    
    // طلب إذن الإشعارات
    console.log('🔔 طلب إذن الإشعارات...');
    
    const permission = await Notification.requestPermission();
    console.log('📋 نتيجة الإذن:', permission);
    
    if (permission === 'granted') {
        console.log('🎉 تم منح الإذن! جاري الحصول على Token...');
        
        // الحصول على FCM Token
        const token = await messaging.getToken({ vapidKey });
        
        if (token) {
            console.log('✅ FCM Token الخاص بك:');
            console.log('='.repeat(50));
            console.log(token);
            console.log('='.repeat(50));
            
            // عرض Token في نافذة جميلة
            showTokenInPopup(token);
            
        } else {
            console.log('❌ لم يتم الحصول على Token');
            alert('❌ لم يتم إنشاء Token. قد يكون هناك مشكلة في الـ VAPID Key');
        }
        
    } else if (permission === 'denied') {
        console.log('❌ تم رفض الإذن من قبل المستخدم');
        alert('⚠️ تم رفض الإذن. يجب السماح بالإشعارات يدوياً من إعدادات المتصفح');
        showPermissionGuide();
    } else {
        console.log('ℹ️ المستخدم لم يقرر بعد');
        alert('ℹ️ لم يتم اختيار أي خيار. جرب مرة أخرى وانقر على "Allow"');
    }
    
} catch (error) {
    console.error('❌ خطأ:', error);
    alert('حدث خطأ: ' + error.message);
}

// ===============================
// دالة لعرض Token في نافذة جميلة
// ===============================
function showTokenInPopup(token) {
    // إنشاء نافذة منبثقة
    const popup = window.open('', 'FCM Token', `
        width=700,height=600,
        left=${(screen.width - 700) / 2},
        top=${(screen.height - 600) / 2},
        resizable=yes,scrollbars=yes
    `);
    
    popup.document.write(`
        <!DOCTYPE html>
        <html dir="rtl">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>🔑 FCM Token الخاص بك</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }
                
                body {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 20px;
                }
                
                .container {
                    background: white;
                    border-radius: 20px;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                    overflow: hidden;
                    width: 100%;
                    max-width: 650px;
                    animation: slideUp 0.5s ease-out;
                }
                
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .header {
                    background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
                    color: white;
                    padding: 30px;
                    text-align: center;
                }
                
                .header h1 {
                    font-size: 28px;
                    margin-bottom: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 15px;
                }
                
                .header p {
                    opacity: 0.9;
                    font-size: 16px;
                }
                
                .content {
                    padding: 30px;
                }
                
                .token-box {
                    background: #f8f9fa;
                    border: 2px dashed #4CAF50;
                    border-radius: 10px;
                    padding: 20px;
                    margin: 20px 0;
                    position: relative;
                }
                
                .token-label {
                    color: #666;
                    font-size: 14px;
                    margin-bottom: 10px;
                    display: block;
                }
                
                #token-text {
                    width: 100%;
                    height: 120px;
                    border: none;
                    background: transparent;
                    resize: none;
                    font-family: 'Courier New', monospace;
                    font-size: 14px;
                    line-height: 1.5;
                    color: #333;
                    outline: none;
                }
                
                .buttons {
                    display: flex;
                    gap: 15px;
                    flex-wrap: wrap;
                    justify-content: center;
                    margin-top: 30px;
                }
                
                .btn {
                    padding: 15px 30px;
                    border: none;
                    border-radius: 10px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    min-width: 180px;
                }
                
                .btn-copy {
                    background: linear-gradient(135deg, #2196F3 0%, #1976D2 100%);
                    color: white;
                }
                
                .btn-copy:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 10px 20px rgba(33, 150, 243, 0.3);
                }
                
                .btn-test {
                    background: linear-gradient(135deg, #FF9800 0%, #F57C00 100%);
                    color: white;
                }
                
                .btn-test:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 10px 20px rgba(255, 152, 0, 0.3);
                }
                
                .btn-close {
                    background: #f8f9fa;
                    color: #666;
                    border: 2px solid #dee2e6;
                }
                
                .btn-close:hover {
                    background: #e9ecef;
                }
                
                .instructions {
                    background: #fff8e1;
                    border-right: 4px solid #FFC107;
                    padding: 20px;
                    border-radius: 8px;
                    margin-top: 25px;
                }
                
                .instructions h3 {
                    color: #FF9800;
                    margin-bottom: 10px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                
                .instructions ol {
                    margin-right: 20px;
                    line-height: 1.8;
                }
                
                .instructions li {
                    margin-bottom: 8px;
                }
                
                .success-message {
                    background: #d4edda;
                    color: #155724;
                    padding: 15px;
                    border-radius: 8px;
                    margin-top: 20px;
                    display: none;
                    text-align: center;
                    border: 1px solid #c3e6cb;
                }
                
                .footer {
                    text-align: center;
                    padding: 20px;
                    color: #666;
                    font-size: 14px;
                    border-top: 1px solid #eee;
                }
                
                @media (max-width: 768px) {
                    .container {
                        margin: 10px;
                    }
                    
                    .buttons {
                        flex-direction: column;
                    }
                    
                    .btn {
                        width: 100%;
                    }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>
                        <span style="font-size: 40px;">🔑</span>
                        تم الحصول على FCM Token
                    </h1>
                    <p>انسخ هذا الرمز والصقه في حقل Firebase Console للاختبار</p>
                </div>
                
                <div class="content">
                    <div class="token-box">
                        <label class="token-label">FCM Token الخاص بجهازك:</label>
                        <textarea id="token-text" readonly>${token}</textarea>
                    </div>
                    
                    <div class="buttons">
                        <button class="btn btn-copy" onclick="copyToken()">
                            <span style="font-size: 20px;">📋</span>
                            نسخ Token إلى الحافظة
                        </button>
                        
                        <button class="btn btn-test" onclick="testNotification()">
                            <span style="font-size: 20px;">🚀</span>
                            اختبار إرسال إشعار
                        </button>
                        
                        <button class="btn btn-close" onclick="window.close()">
                            <span style="font-size: 20px;">✕</span>
                            إغلاق النافذة
                        </button>
                    </div>
                    
                    <div class="success-message" id="successMessage">
                        ✅ تم نسخ Token إلى الحافظة بنجاح!
                    </div>
                    
                    <div class="instructions">
                        <h3>
                            <span style="font-size: 24px;">📝</span>
                            خطوات استخدام Token:
                        </h3>
                        <ol>
                            <li>انقر على زر "نسخ Token" أعلاه</li>
                            <li>اذهب إلى <strong>Firebase Console</strong></li>
                            <li>اختر مشروع <strong>system-306</strong></li>
                            <li>اذهل إلى <strong>Cloud Messaging</strong></li>
                            <li>انقر على <strong>Send your first message</strong></li>
                            <li>الصق Token في حقل <strong>Test on device</strong></li>
                            <li>اكتب رسالة واختر <strong>Test</strong></li>
                        </ol>
                    </div>
                </div>
                
                <div class="footer">
                    <p>🔒 هذا الرمز خاص بجهازك الحالي فقط | الطول: ${token.length} حرف</p>
                </div>
            </div>
            
            <script>
                // نسخ Token إلى الحافظة
                function copyToken() {
                    const textarea = document.getElementById('token-text');
                    textarea.select();
                    textarea.setSelectionRange(0, 99999); // للهواتف
                    
                    try {
                        document.execCommand('copy');
                        showSuccessMessage();
                        
                        // أيضًا نسخ إلى clipboard API الحديث
                        navigator.clipboard.writeText(textarea.value).then(() => {
                            console.log('Token copied to clipboard');
                        });
                    } catch (err) {
                        console.error('Copy failed:', err);
                    }
                }
                
                // عرض رسالة النجاح
                function showSuccessMessage() {
                    const message = document.getElementById('successMessage');
                    message.style.display = 'block';
                    
                    setTimeout(() => {
                        message.style.display = 'none';
                    }, 3000);
                }
                
                // اختبار إرسال إشعار
                function testNotification() {
                    if ('Notification' in window && Notification.permission === 'granted') {
                        new Notification('🎉 اختبار الإشعارات', {
                            body: 'تم استلام الإشعار بنجاح!',
                            icon: 'https://cdn-icons-png.flaticon.com/512/733/733585.png',
                            badge: 'https://cdn-icons-png.flaticon.com/512/733/733585.png'
                        });
                        
                        alert('✅ تم إرسال إشعار اختبار! تحقق من شريط الإشعارات');
                    } else {
                        alert('⚠️ يجب منح إذن الإشعارات أولاً');
                    }
                }
                
                // نسخ تلقائي عند فتح النافذة
                setTimeout(() => {
                    copyToken();
                }, 500);
            </script>
        </body>
        </html>
    `);
}

// ===============================
// دالة لعرض دليل السماح اليدوي
// ===============================
function showPermissionGuide() {
    const guideWindow = window.open('', 'دليل الإعدادات', 'width=600,height=500');
    
    guideWindow.document.write(`
        <html dir="rtl">
        <head>
            <title>🔧 دليل تفعيل الإشعارات يدوياً</title>
            <style>
                body { font-family: Arial; padding: 20px; line-height: 1.6; }
                h2 { color: #f44336; }
                .step { background: #fff3cd; padding: 15px; margin: 10px 0; border-radius: 5px; border-right: 4px solid #ffc107; }
                .code { background: #f8f9fa; padding: 10px; border-radius: 5px; font-family: monospace; margin: 10px 0; }
            </style>
        </head>
        <body>
            <h2>⚠️ يجب تفعيل الإشعارات يدوياً</h2>
            
            <div class="step">
                <strong>الخطوة 1:</strong> افتح إعدادات المتصفح
                <div class="code">chrome://settings/content/notifications</div>
            </div>
            
            <div class="step">
                <strong>الخطوة 2:</strong> ابحث عن موقعك في القائمة
            </div>
            
            <div class="step">
                <strong>الخطوة 3:</strong> اضبطه على <strong style="color: green;">"Allow"</strong>
            </div>
            
            <div class="step">
                <strong>الخطوة 4:</strong> أعد تحميل الصفحة وجرب الكود مرة أخرى
            </div>
            
            <button onclick="window.close()" style="padding: 10px 20px; background: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer; margin-top: 20px;">
                فهمت، سأقوم بالتعديل
            </button>
        </body>
        </html>
    `);
}