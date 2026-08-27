package com.example.mobile_android.ui.core

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material.icons.filled.CloudUpload
import androidx.compose.material.icons.filled.Map
import androidx.compose.material.icons.filled.Payment
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavDestination.Companion.hierarchy
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import com.example.mobile_android.ui.navigation.Screen
import com.example.mobile_android.HomeScreen
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MainScreen(
    onLogout: () -> Unit = {}
) {
    val navController = rememberNavController()
    val drawerState = rememberDrawerState(initialValue = DrawerValue.Closed)
    val scope = rememberCoroutineScope()
    
    val tabItems = listOf(
        Screen.DepartmentList,
        Screen.EmployeeList,
        Screen.Settings
    )

    ModalNavigationDrawer(
        drawerState = drawerState,
        drawerContent = {
            ModalDrawerSheet(
                modifier = Modifier.fillMaxWidth(0.65f)
            ) {
                Spacer(modifier = Modifier.height(16.dp))
                Text(
                    "Menu",
                    modifier = Modifier.padding(16.dp),
                    style = MaterialTheme.typography.titleLarge
                )
                Divider()
                
                NavigationDrawerItem(
                    icon = { Icon(Icons.Default.Home, contentDescription = null) },
                    label = { Text("Trang Chủ") },
                    selected = false,
                    onClick = {
                        scope.launch { drawerState.close() }
                        navController.navigate(Screen.Home.route) {
                            popUpTo(navController.graph.findStartDestination().id) {
                                saveState = true
                            }
                            launchSingleTop = true
                        }
                    },
                    modifier = Modifier.padding(horizontal = 12.dp)
                )
                
                NavigationDrawerItem(
                    icon = { Icon(Icons.Default.Chat, contentDescription = null) },
                    label = { Text("Trò Chuyện") },
                    selected = false,
                    onClick = {
                        scope.launch { drawerState.close() }
                        navController.navigate(Screen.ChatList.route) {
                            popUpTo(navController.graph.findStartDestination().id) {
                                saveState = true
                            }
                            launchSingleTop = true
                        }
                    },
                    modifier = Modifier.padding(horizontal = 12.dp)
                )

                NavigationDrawerItem(
                    icon = { Icon(Icons.Default.Notifications, contentDescription = null) },
                    label = { Text("Thông Báo") },
                    selected = false,
                    onClick = {
                        scope.launch { drawerState.close() }
                        navController.navigate(Screen.NotificationList.route) {
                            popUpTo(navController.graph.findStartDestination().id) {
                                saveState = true
                            }
                            launchSingleTop = true
                        }
                    },
                    modifier = Modifier.padding(horizontal = 12.dp)
                )

                NavigationDrawerItem(
                    icon = { Icon(Icons.Default.CloudUpload, contentDescription = null) },
                    label = { Text("Tải lên Media") },
                    selected = false,
                    onClick = {
                        scope.launch { drawerState.close() }
                        navController.navigate(Screen.UploadMedia.route)
                    },
                    modifier = Modifier.padding(horizontal = 12.dp)
                )

                NavigationDrawerItem(
                    icon = { Icon(Icons.Default.Map, contentDescription = null) },
                    label = { Text("Bản Đồ") },
                    selected = false,
                    onClick = {
                        scope.launch { drawerState.close() }
                        navController.navigate(Screen.Map.route)
                    },
                    modifier = Modifier.padding(horizontal = 12.dp)
                )

                NavigationDrawerItem(
                    icon = { Icon(Icons.Default.Payment, contentDescription = null) },
                    label = { Text("Thanh Toán") },
                    selected = false,
                    onClick = {
                        scope.launch { drawerState.close() }
                        navController.navigate(Screen.PaymentSelection.route)
                    },
                    modifier = Modifier.padding(horizontal = 12.dp)
                )
                        
                Divider(modifier = Modifier.padding(vertical = 8.dp))
                
                NavigationDrawerItem(
                    icon = { Icon(Icons.Default.Info, contentDescription = null) },
                    label = { Text("Giới Thiệu") },
                    selected = false,
                    onClick = { scope.launch { drawerState.close() } },
                    modifier = Modifier.padding(horizontal = 12.dp)
                )
            }
        }
    ) {
        Scaffold(
            topBar = {
                TopAppBar(
                    title = { Text("Dashboard") },
                    navigationIcon = {
                        IconButton(onClick = { scope.launch { drawerState.open() } }) {
                            Icon(Icons.Default.Menu, contentDescription = "Menu")
                        }
                    },
                    colors = TopAppBarDefaults.topAppBarColors(
                        containerColor = MaterialTheme.colorScheme.primary,
                        titleContentColor = MaterialTheme.colorScheme.onPrimary,
                        navigationIconContentColor = MaterialTheme.colorScheme.onPrimary
                    )
                )
            },
            bottomBar = {
                NavigationBar {
                    val navBackStackEntry by navController.currentBackStackEntryAsState()
                    val currentDestination = navBackStackEntry?.destination
                    
                    tabItems.forEach { screen ->
                        NavigationBarItem(
                            icon = {
                                when (screen) {
                                    Screen.DepartmentList -> Icon(Icons.Default.Business, contentDescription = "Phòng Ban")
                                    Screen.EmployeeList -> Icon(Icons.Default.People, contentDescription = "Nhân Viên")
                                    Screen.Settings -> Icon(Icons.Default.Settings, contentDescription = "Cài Đặt")
                                    else -> {}
                                }
                            },
                            label = {
                                when (screen) {
                                    Screen.DepartmentList -> Text("Phòng Ban")
                                    Screen.EmployeeList -> Text("Nhân Viên")
                                    Screen.Settings -> Text("Cài Đặt")
                                    else -> {}
                                }
                            },
                            selected = currentDestination?.hierarchy?.any { it.route == screen.route } == true,
                            onClick = {
                                navController.navigate(screen.route) {
                                    popUpTo(navController.graph.findStartDestination().id) {
                                        saveState = true
                                    }
                                    launchSingleTop = true
                                    restoreState = true
                                }
                            }
                        )
                    }
                }
            }
        ) { innerPadding ->
            NavHost(
                navController = navController,
                startDestination = Screen.DepartmentList.route,
                modifier = Modifier.padding(innerPadding)
            ) {
                composable(Screen.Home.route) { HomeScreen() }
                composable(Screen.DepartmentList.route) { 
                    com.example.mobile_android.ui.department.DepartmentListScreen(
                        onNavigateToDetail = { departmentId ->
                            navController.navigate(Screen.DepartmentDetail.createRoute(departmentId))
                        },
                        onNavigateToForm = {
                            navController.navigate(Screen.DepartmentForm.createRoute())
                        }
                    )
                }
                composable(
                    route = Screen.DepartmentDetail.route,
                    arguments = listOf(androidx.navigation.navArgument("departmentId") {
                        type = androidx.navigation.NavType.StringType
                    })
                ) {
                    com.example.mobile_android.ui.department.DepartmentDetailScreen(
                        onNavigateBack = { navController.popBackStack() },
                        onNavigateToEdit = { departmentId ->
                            navController.navigate(Screen.DepartmentForm.createRoute(departmentId))
                        }
                    )
                }
                composable(
                    route = Screen.DepartmentForm.route,
                    arguments = listOf(androidx.navigation.navArgument("departmentId") {
                        type = androidx.navigation.NavType.StringType
                        nullable = true
                        defaultValue = null
                    })
                ) {
                    com.example.mobile_android.ui.department.DepartmentFormScreen(
                        onNavigateBack = { navController.popBackStack() }
                    )
                }
                composable(Screen.EmployeeList.route) { 
                    com.example.mobile_android.ui.employee.EmployeeListScreen(
                        onNavigateToDetail = { employeeId ->
                            navController.navigate(Screen.EmployeeDetail.createRoute(employeeId))
                        },
                        onNavigateToForm = {
                            navController.navigate(Screen.EmployeeForm.createRoute())
                        }
                    )
                }
                composable(
                    route = Screen.EmployeeDetail.route,
                    arguments = listOf(androidx.navigation.navArgument("employeeId") {
                        type = androidx.navigation.NavType.StringType
                    })
                ) {
                    com.example.mobile_android.ui.employee.EmployeeDetailScreen(
                        onNavigateBack = { navController.popBackStack() },
                        onNavigateToEdit = { employeeId ->
                            navController.navigate(Screen.EmployeeForm.createRoute(employeeId))
                        }
                    )
                }
                composable(
                    route = Screen.EmployeeForm.route,
                    arguments = listOf(androidx.navigation.navArgument("employeeId") {
                        type = androidx.navigation.NavType.StringType
                        nullable = true
                        defaultValue = null
                    })
                ) {
                    com.example.mobile_android.ui.employee.EmployeeFormScreen(
                        onNavigateBack = { navController.popBackStack() }
                    )
                }
                composable(Screen.Settings.route) { 
                    com.example.mobile_android.ui.settings.SettingsScreen(
                        onLogout = onLogout,
                        onNavigateToProfile = {
                            navController.navigate(Screen.Profile.route)
                        }
                    )
                }
                composable(Screen.Profile.route) {
                    com.example.mobile_android.ui.profile.ProfileScreen(
                        onNavigateBack = { navController.popBackStack() }
                    )
                }
                composable(Screen.ChatList.route) {
                    com.example.mobile_android.ui.chat.ChatListScreen(
                        onNavigateToRoom = { channelId ->
                            navController.navigate(Screen.ChatRoom.createRoute(channelId))
                        }
                    )
                }
                composable(
                    route = Screen.ChatRoom.route,
                    arguments = listOf(androidx.navigation.navArgument("channelId") { 
                        type = androidx.navigation.NavType.StringType 
                    })
                ) { backStackEntry ->
                    val channelId = backStackEntry.arguments?.getString("channelId") ?: ""
                    com.example.mobile_android.ui.chat.ChatRoomScreen(channelId = channelId)
                }
            }
        }
    }
}
