// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 获取登录表单元素
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.querySelector('.login-btn');
    
    // 输入框获得焦点时添加动画效果
    const formInputs = document.querySelectorAll('.form-group input');
    formInputs.forEach(input => {
        const inputIcon = input.previousElementSibling.querySelector('i');
        
        input.addEventListener('focus', function() {
            inputIcon.style.color = '#9370DB';
            this.style.borderColor = '#9370DB';
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                inputIcon.style.color = '#aaa';
                this.style.borderColor = '#e0e0e0';
            }
        });
        
        // 如果输入框已有值，保持样式
        if (input.value) {
            inputIcon.style.color = '#9370DB';
        }
    });
    
    // 社交媒体按钮动画
    const socialBtns = document.querySelectorAll('.social-btn');
    
    socialBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // 表单提交处理
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // 阻止表单默认提交行为
        
        // 简单的表单验证
        let isValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        // 验证邮箱
        if (!emailInput.value.trim()) {
            showError(emailInput, '请输入邮箱地址');
            isValid = false;
        } else if (!emailRegex.test(emailInput.value)) {
            showError(emailInput, '请输入有效的邮箱地址');
            isValid = false;
        } else {
            removeError(emailInput);
        }
        
        // 验证密码
        if (!passwordInput.value.trim()) {
            showError(passwordInput, '请输入密码');
            isValid = false;
        } else if (passwordInput.value.length < 6) {
            showError(passwordInput, '密码长度至少为6个字符');
            isValid = false;
        } else {
            removeError(passwordInput);
        }
        
        // 如果验证通过，添加登录动画
        if (isValid) {
            // 添加按钮加载动画
            loginBtn.innerHTML = '<span class="loading-spinner"></span> 登录中...';
            loginBtn.disabled = true;
            loginBtn.classList.add('loading');
            
            // 模拟API请求延迟
            setTimeout(function() {
                loginBtn.innerHTML = '<i class="fas fa-check"></i> 登录成功';
                loginBtn.classList.remove('loading');
                loginBtn.classList.add('success');
                
                // 重定向或显示成功消息
                setTimeout(function() {
                    // 这里可以添加实际的登录后逻辑
                    alert('登录成功！');
                    loginBtn.innerHTML = '登录';
                    loginBtn.disabled = false;
                    loginBtn.classList.remove('success');
                }, 1000);
            }, 1000);
        }
    });
    
    // 显示错误信息
    function showError(input, message) {
        const formGroup = input.parentElement;
        let errorElement = formGroup.querySelector('.error-message');
        const inputIcon = formGroup.querySelector('.input-icon i');
        
        inputIcon.style.color = '#ff3b30';
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        formGroup.classList.add('error');
        input.style.borderColor = '#ff3b30';
    }
    
    // 移除错误信息
    function removeError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        const inputIcon = formGroup.querySelector('.input-icon i');
        
        if (errorElement) {
            formGroup.removeChild(errorElement);
        }
        
        inputIcon.style.color = '#9370DB';
        formGroup.classList.remove('error');
    }
});

// 添加额外的样式
document.head.insertAdjacentHTML('beforeend', `
<style>
.error-message {
    color: #ff3b30;
    font-size: 12px;
    margin-top: 5px;
    margin-left: 10px;
}

/* 加载动画 */
.loading-spinner {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: #fff;
    animation: spin 0.8s linear infinite;
    margin-right: 6px;
    vertical-align: middle;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.login-btn.loading {
    background: #8252d6;
    cursor: not-allowed;
}

.login-btn.success {
    background: #10b981;
}
</style>
`); 