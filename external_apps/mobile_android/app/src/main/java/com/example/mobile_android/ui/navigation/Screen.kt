package com.example.mobile_android.ui.navigation

sealed class Screen(val route: String) {
    object Login : Screen("login")
    object TwoFactor : Screen("two_factor/{tempToken}/{email}") {
        fun createRoute(tempToken: String, email: String) = "two_factor/$tempToken/$email"
    }
    object Home : Screen("home")
    object DepartmentList : Screen("department_list")
    object DepartmentDetail : Screen("department_detail/{departmentId}") {
        fun createRoute(departmentId: String) = "department_detail/$departmentId"
    }
    object DepartmentForm : Screen("department_form?departmentId={departmentId}") {
        fun createRoute(departmentId: String? = null) = 
            if (departmentId != null) "department_form?departmentId=$departmentId" 
            else "department_form"
    }
    object EmployeeList : Screen("employee_list")
    object EmployeeDetail : Screen("employee_detail/{employeeId}") {
        fun createRoute(employeeId: String) = "employee_detail/$employeeId"
    }
    object EmployeeForm : Screen("employee_form?employeeId={employeeId}") {
        fun createRoute(employeeId: String? = null) = 
            if (employeeId != null) "employee_form?employeeId=$employeeId" 
            else "employee_form"
    }
    object Settings : Screen("settings")
    object Profile : Screen("profile")
    object ChatList : Screen("chat_list")
    object ChatRoom : Screen("chat_room/{channelId}") {
        fun createRoute(channelId: String) = "chat_room/$channelId"
    }
    object NotificationList : Screen("notification_list")
    object NotificationDetail : Screen("notification_detail/{notificationId}") {
        fun createRoute(notificationId: String) = "notification_detail/$notificationId"
    }
    object UploadMedia : Screen("upload_media")
    object Map : Screen("map")
    object PaymentSelection : Screen("payment_selection")
    object TransactionHistory : Screen("transaction_history")
}
