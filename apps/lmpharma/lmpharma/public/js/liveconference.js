/*
    Live Conference Interaction Logic
    Handles: Tab switching, Poll interactions, and Async Data Fetching
*/

document.addEventListener('DOMContentLoaded', () => {
    console.log('Live Conference Portal Loaded');
    initPolls();
});

function initPolls() {
    // Basic poll initialization
    const polls = document.querySelectorAll('[id^="poll-"]');
    polls.forEach(poll => {
        const pollId = poll.id.replace('poll-', '');
        loadPollData(pollId, poll);
    });
}

function loadPollData(pollId, container) {
    frappe.call({
        method: "liveconference.api.get_poll_details",
        args: {
            poll_id: pollId
        },
        callback: (r) => {
            if (r.message && !r.message.error) {
                const poll = r.message;
                if (poll.questions && poll.questions.length > 0) {
                    renderPollQuestions(container, poll.questions, poll.name);
                } else {
                    container.innerHTML = '<p style="color: var(--text-muted); font-size: 0.85rem;">Chưa có câu hỏi nào.</p>';
                }
            } else {
                container.innerHTML = '<p style="color: var(--text-danger); font-size: 0.85rem;">Không thể tải bình chọn.</p>';
            }
        },
        error: (err) => {
            console.error('Error loading poll:', err);
            container.innerHTML = '<p style="color: var(--text-danger); font-size: 0.85rem;">Lỗi kết nối.</p>';
        }
    });
}

function renderPollQuestions(container, questions, pollId) {
    let html = '';
    questions.forEach((q, qIndex) => {
        html += `<div style="margin-bottom: 12px;">`;
        html += `<div style="font-size: 0.85rem; margin-bottom: 6px; font-weight: 500;">${q.question}</div>`;
        
        if (q.options && q.options.length > 0) {
            q.options.forEach(opt => {
                html += `<button class="btn-primary" style="width: 100%; margin-bottom: 6px; font-size: 0.8rem; background: var(--glass-bg); border: 1px solid var(--glass-border);" onclick="vote('${opt}', '${pollId}', ${qIndex})">${opt}</button>`;
            });
        }
        
        html += `</div>`;
    });
    container.innerHTML = html;
}

function vote(option, pollId, questionIndex) {
    // Check if user is logged in
    if (!frappe.session.user || frappe.session.user === 'Guest') {
        frappe.msgprint({
            title: 'Yêu cầu đăng nhập',
            message: 'Vui lòng đăng nhập để tham gia bình chọn',
            indicator: 'red'
        });
        return;
    }
    
    frappe.call({
        method: "liveconference.api.submit_vote",
        args: {
            poll_id: pollId,
            question_index: questionIndex,
            option: option
        },
        callback: (r) => {
            if (r.message && r.message.success) {
                frappe.show_alert({
                    message: r.message.message || 'Bình chọn thành công!',
                    indicator: 'green'
                });
            } else if (r.message && r.message.error) {
                frappe.show_alert({
                    message: r.message.error,
                    indicator: 'red'
                });
            }
        },
        error: (err) => {
            console.error('Error submitting vote:', err);
            frappe.show_alert({
                message: 'Có lỗi xảy ra khi gửi bình chọn',
                indicator: 'red'
            });
        }
    });
}

function switchTab(tab) {
    const interactionPanel = document.getElementById('interaction-panel');
    const attendeesPanel = document.getElementById('attendees-panel');
    
    if (interactionPanel && attendeesPanel) {
        interactionPanel.style.display = tab === 'interaction' ? 'block' : 'none';
        attendeesPanel.style.display = tab === 'attendees' ? 'block' : 'none';
    }
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        const text = btn.innerText.toLowerCase();
        if (tab === 'interaction' && text.includes('tương tác')) btn.classList.add('active');
        else if (tab === 'attendees' && text.includes('người tham dự')) btn.classList.add('active');
        else btn.classList.remove('active');
    });
}
