package com.example.mobile_android.ui.employee

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Save
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun EmployeeFormScreen(
    onNavigateBack: () -> Unit,
    viewModel: EmployeeFormViewModel = hiltViewModel()
) {
    val firstName by viewModel.firstName.collectAsState()
    val lastName by viewModel.lastName.collectAsState()
    val email by viewModel.email.collectAsState()
    val position by viewModel.position.collectAsState()
    val selectedDepartmentId by viewModel.selectedDepartmentId.collectAsState()
    val departments by viewModel.departments.collectAsState()
    val state by viewModel.state.collectAsState()

    var showDepartmentDropdown by remember { mutableStateOf(false) }

    LaunchedEffect(state) {
        if (state is EmployeeFormState.Success) {
            onNavigateBack()
        }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(if (viewModel.isEditMode) "Sửa Nhân Viên" else "Thêm Nhân Viên") },
                navigationIcon = {
                    IconButton(onClick = onNavigateBack) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Back")
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.primary,
                    titleContentColor = MaterialTheme.colorScheme.onPrimary,
                    navigationIconContentColor = MaterialTheme.colorScheme.onPrimary
                )
            )
        },
        floatingActionButton = {
            if (state !is EmployeeFormState.Loading) {
                FloatingActionButton(
                    onClick = { viewModel.saveEmployee() },
                    containerColor = MaterialTheme.colorScheme.primary
                ) {
                    Icon(Icons.Default.Save, contentDescription = "Save")
                }
            }
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            OutlinedTextField(
                value = firstName,
                onValueChange = { viewModel.updateFirstName(it) },
                label = { Text("Họ *") },
                modifier = Modifier.fillMaxWidth(),
                singleLine = true
            )

            OutlinedTextField(
                value = lastName,
                onValueChange = { viewModel.updateLastName(it) },
                label = { Text("Tên *") },
                modifier = Modifier.fillMaxWidth(),
                singleLine = true
            )

            OutlinedTextField(
                value = email,
                onValueChange = { viewModel.updateEmail(it) },
                label = { Text("Email") },
                modifier = Modifier.fillMaxWidth(),
                singleLine = true
            )

            OutlinedTextField(
                value = position,
                onValueChange = { viewModel.updatePosition(it) },
                label = { Text("Chức Vụ *") },
                modifier = Modifier.fillMaxWidth(),
                singleLine = true
            )

            // Department Dropdown
            ExposedDropdownMenuBox(
                expanded = showDepartmentDropdown,
                onExpandedChange = { showDepartmentDropdown = it }
            ) {
                OutlinedTextField(
                    value = departments.find { it.id == selectedDepartmentId }?.name ?: "",
                    onValueChange = {},
                    readOnly = true,
                    label = { Text("Phòng Ban") },
                    trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = showDepartmentDropdown) },
                    modifier = Modifier
                        .fillMaxWidth()
                        .menuAnchor()
                )
                ExposedDropdownMenu(
                    expanded = showDepartmentDropdown,
                    onDismissRequest = { showDepartmentDropdown = false }
                ) {
                    DropdownMenuItem(
                        text = { Text("Không có") },
                        onClick = {
                            viewModel.updateDepartment(null)
                            showDepartmentDropdown = false
                        }
                    )
                    departments.forEach { department ->
                        DropdownMenuItem(
                            text = { Text(department.name) },
                            onClick = {
                                viewModel.updateDepartment(department.id)
                                showDepartmentDropdown = false
                            }
                        )
                    }
                }
            }

            if (state is EmployeeFormState.Loading) {
                CircularProgressIndicator(modifier = Modifier.padding(16.dp))
            }

            if (state is EmployeeFormState.Error) {
                Text(
                    text = (state as EmployeeFormState.Error).message,
                    color = MaterialTheme.colorScheme.error,
                    style = MaterialTheme.typography.bodyMedium
                )
            }
        }
    }
}
