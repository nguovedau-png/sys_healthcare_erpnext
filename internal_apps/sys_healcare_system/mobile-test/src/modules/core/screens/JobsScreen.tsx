import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl, ScrollView, Alert } from 'react-native';
import api from '../../../services/api';
import { Activity, Mail, Bell, Zap, RotateCcw, Trash2, Calendar, Clock } from 'lucide-react-native';

interface Job {
    id: string;
    name: string;
    type: string;
    status: string;
    result?: any;
    error?: string;
    createdAt: string;
}

interface ScheduledJob {
    key: string;
    name: string;
    id: string;
    cron: string;
    next: number;
    type: string;
}

const JobsScreen = () => {
    const [activeTab, setActiveTab] = useState<'history' | 'scheduled'>('history');
    const [jobs, setJobs] = useState<Job[]>([]);
    const [scheduledJobs, setScheduledJobs] = useState<ScheduledJob[]>([]);
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    // Filters
    const [filterType, setFilterType] = useState<string | null>(null);
    const [filterStatus, setFilterStatus] = useState<string | null>(null);

    // Selection
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const params: any = { limit: 20 };
            if (filterType) params.type = filterType;
            if (filterStatus) params.status = filterStatus;

            const [jobsRes, statsRes, scheduledRes] = await Promise.all([
                api.get('/jobs', { params }),
                api.get('/jobs/stats'),
                api.get('/jobs/scheduled')
            ]);

            if (jobsRes.data.success) setJobs(jobsRes.data.data);
            if (statsRes.data.success) setStats(statsRes.data.data);
            if (scheduledRes.data.success) setScheduledJobs(scheduledRes.data.data);

        } catch (error) {
            console.error('Failed to fetch jobs', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [filterType, filterStatus]);

    const handleRetry = async (id: string) => {
        try {
            await api.post(`/jobs/${id}/retry`);
            Alert.alert('Success', 'Job has been re-queued for retry.');
            setSelectedJob(null);
            fetchData();
        } catch (error) {
            Alert.alert('Error', 'Failed to retry job.');
        }
    };

    const handleDeleteScheduled = async (key: string, type: string) => {
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to remove this scheduled job?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            // Using encodeURIComponent for key as it might contain special chars
                            await api.delete(`/jobs/scheduled/${encodeURIComponent(key)}?type=${type}`);
                            fetchData();
                        } catch (error) {
                            Alert.alert('Error', 'Failed to delete schedule.');
                        }
                    }
                }
            ]
        );
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'COMPLETED': return '#52c41a';
            case 'FAILED': return '#ff4d4f';
            case 'PROCESSING': return '#1890ff';
            default: return '#faad14';
        }
    };

    const FilterChip = ({ label, active, onPress }: { label: string, active: boolean, onPress: () => void }) => (
        <TouchableOpacity
            style={[styles.filterChip, active && styles.activeFilterChip]}
            onPress={onPress}
        >
            <Text style={[styles.filterText, active && styles.activeFilterText]}>{label}</Text>
        </TouchableOpacity>
    );

    const renderStatCard = (title: string, value: string | number, subtext: string, icon: any, color: string) => (
        <View style={[styles.statCard, { borderLeftColor: color }]}>
            <View style={styles.statHeader}>
                {icon}
                <Text style={styles.statValue}>{value}</Text>
            </View>
            <Text style={styles.statTitle}>{title}</Text>
            <Text style={styles.statSub}>{subtext}</Text>
        </View>
    );

    const renderJobItem = ({ item }: { item: Job }) => (
        <TouchableOpacity style={styles.jobItem} onPress={() => setSelectedJob(item)}>
            <View style={styles.jobHeader}>
                <Text style={styles.jobName}>{item.name}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                    <Text style={styles.statusText}>{item.status}</Text>
                </View>
            </View>
            <View style={styles.jobDetails}>
                <Text style={styles.jobType}>{item.type}</Text>
                <Text style={styles.jobDate}>{new Date(item.createdAt).toLocaleString()}</Text>
            </View>
        </TouchableOpacity>
    );

    const renderScheduledItem = ({ item }: { item: ScheduledJob }) => (
        <View style={styles.jobItem}>
            <View style={styles.jobHeader}>
                <Text style={styles.jobName}>{item.name || 'Unnamed Schedule'}</Text>
                <TouchableOpacity onPress={() => handleDeleteScheduled(item.key, item.type)}>
                    <Trash2 size={18} color="#ff4d4f" />
                </TouchableOpacity>
            </View>
            <View style={styles.jobDetails}>
                <View style={[styles.tag, { backgroundColor: '#e6f7ff', borderColor: '#91d5ff' }]}>
                    <Text style={{ color: '#1890ff', fontSize: 12 }}>{item.type.toUpperCase()}</Text>
                </View>
                <View style={[styles.tag, { backgroundColor: '#f9f0ff', borderColor: '#d3adf7', marginLeft: 8 }]}>
                    <Text style={{ color: '#722ed1', fontSize: 12 }}>{item.cron}</Text>
                </View>
            </View>
            <View style={{ marginTop: 8, flexDirection: 'row', alignItems: 'center' }}>
                <Clock size={14} color="#8c8c8c" />
                <Text style={{ color: '#8c8c8c', fontSize: 12, marginLeft: 4 }}>
                    Next: {item.next ? new Date(item.next).toLocaleString() : 'N/A'}
                </Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Stats Section - Always Visible */}
            {stats && (
                <View style={styles.statsContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {renderStatCard('Email Queue', stats.email?.active || 0, `${stats.email?.waiting || 0} waiting`, <Mail size={20} color="#52c41a" />, '#52c41a')}
                        {renderStatCard('Notifications', stats.notification?.active || 0, `${stats.notification?.waiting || 0} waiting`, <Bell size={20} color="#ff4d4f" />, '#ff4d4f')}
                        {renderStatCard('Heavy Jobs', stats.heavy?.active || 0, `Completed: ${stats.heavy?.completed}`, <Zap size={20} color="#1890ff" />, '#1890ff')}
                    </ScrollView>
                </View>
            )}

            {/* Tab Switcher */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'history' && styles.activeTabButton]}
                    onPress={() => setActiveTab('history')}
                >
                    <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>History</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'scheduled' && styles.activeTabButton]}
                    onPress={() => setActiveTab('scheduled')}
                >
                    <Text style={[styles.tabText, activeTab === 'scheduled' && styles.activeTabText]}>Scheduled</Text>
                </TouchableOpacity>
            </View>

            {activeTab === 'history' ? (
                <>
                    <View style={styles.filterContainer}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 16 }}>
                            <FilterChip label="All Types" active={!filterType} onPress={() => setFilterType(null)} />
                            <FilterChip label="Email" active={filterType === 'email'} onPress={() => setFilterType('email')} />
                            <FilterChip label="Push" active={filterType === 'notification'} onPress={() => setFilterType('notification')} />
                            <FilterChip label="Heavy" active={filterType === 'heavy'} onPress={() => setFilterType('heavy')} />
                            <View style={styles.divider} />
                            <FilterChip label="All Status" active={!filterStatus} onPress={() => setFilterStatus(null)} />
                            <FilterChip label="Pending" active={filterStatus === 'PENDING'} onPress={() => setFilterStatus('PENDING')} />
                            <FilterChip label="Completed" active={filterStatus === 'COMPLETED'} onPress={() => setFilterStatus('COMPLETED')} />
                            <FilterChip label="Failed" active={filterStatus === 'FAILED'} onPress={() => setFilterStatus('FAILED')} />
                        </ScrollView>
                    </View>

                    <FlatList
                        data={jobs}
                        renderItem={renderJobItem}
                        keyExtractor={item => item.id}
                        refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchData} />}
                        contentContainerStyle={styles.listContent}
                        ListEmptyComponent={<Text style={styles.emptyText}>No jobs found</Text>}
                    />
                </>
            ) : (
                <FlatList
                    data={scheduledJobs}
                    renderItem={renderScheduledItem}
                    keyExtractor={item => item.key}
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchData} />}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={<Text style={styles.emptyText}>No scheduled jobs</Text>}
                />
            )}

            {/* Detail Modal */}
            {selectedJob && (
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Job Details</Text>
                            <TouchableOpacity onPress={() => setSelectedJob(null)}>
                                <Text style={styles.closeIcon}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.modalScroll}>
                            <Text style={styles.modalLabel}>ID:</Text>
                            <Text style={styles.modalValue}>{selectedJob.id}</Text>

                            <Text style={styles.modalLabel}>Name:</Text>
                            <Text style={styles.modalValue}>{selectedJob.name}</Text>

                            <Text style={styles.modalLabel}>Type:</Text>
                            <Text style={styles.modalValue}>{selectedJob.type}</Text>

                            <Text style={styles.modalLabel}>Status:</Text>
                            <Text style={[styles.modalValue, { color: getStatusColor(selectedJob.status), fontWeight: 'bold' }]}>
                                {selectedJob.status}
                            </Text>

                            <Text style={styles.modalLabel}>Created:</Text>
                            <Text style={styles.modalValue}>{new Date(selectedJob.createdAt).toLocaleString()}</Text>

                            <Text style={styles.modalLabel}>Result / Error:</Text>
                            <View style={styles.codeBlock}>
                                <Text style={styles.codeText}>
                                    {selectedJob.status === 'FAILED'
                                        ? (selectedJob.error || 'Unknown Error')
                                        : (selectedJob.result ? JSON.stringify(selectedJob.result, null, 2) : 'No result')}
                                </Text>
                            </View>
                        </ScrollView>

                        <View style={styles.modalActions}>
                            <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedJob(null)}>
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>

                            {selectedJob.status === 'FAILED' && (
                                <TouchableOpacity style={styles.retryButton} onPress={() => handleRetry(selectedJob.id)}>
                                    <RotateCcw size={16} color="white" style={{ marginRight: 6 }} />
                                    <Text style={styles.retryButtonText}>Retry</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    statsContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        height: 110,
    },
    statCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginRight: 12,
        width: 140,
        height: 100,
        borderLeftWidth: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    statHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#262626',
    },
    statTitle: {
        fontSize: 14,
        color: '#595959',
        fontWeight: '600',
    },
    statSub: {
        fontSize: 12,
        color: '#8c8c8c',
        marginTop: 4,
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 4,
        marginBottom: 16,
    },
    tabButton: {
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: 6,
    },
    activeTabButton: {
        backgroundColor: '#1890ff',
    },
    tabText: {
        fontWeight: '600',
        color: '#595959',
    },
    activeTabText: {
        color: 'white',
    },
    listContent: {
        paddingBottom: 20,
    },
    jobItem: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    jobHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    jobName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#262626',
        maxWidth: '70%',
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    statusText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    jobDetails: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    jobType: {
        fontSize: 14,
        color: '#595959',
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        overflow: 'hidden',
    },
    jobDate: {
        fontSize: 12,
        color: '#8c8c8c',
        marginLeft: 'auto',
    },
    filterContainer: {
        marginBottom: 16,
        height: 40,
    },
    filterChip: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        backgroundColor: 'white',
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#d9d9d9',
        justifyContent: 'center',
    },
    activeFilterChip: {
        backgroundColor: '#1890ff',
        borderColor: '#1890ff',
    },
    filterText: {
        fontSize: 12,
        color: '#595959',
    },
    activeFilterText: {
        color: 'white',
        fontWeight: '600',
    },
    divider: {
        width: 1,
        height: 20,
        backgroundColor: '#d9d9d9',
        marginHorizontal: 8,
        alignSelf: 'center',
    },
    modalOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        elevation: 5,
        zIndex: 1000,
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 24,
        width: '100%',
        maxHeight: '80%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#262626',
    },
    closeIcon: {
        fontSize: 24,
        color: '#8c8c8c',
        padding: 4,
    },
    modalScroll: {
        marginBottom: 16,
    },
    modalLabel: {
        fontSize: 14,
        color: '#8c8c8c',
        marginBottom: 4,
        marginTop: 12,
    },
    modalValue: {
        fontSize: 16,
        color: '#262626',
    },
    codeBlock: {
        backgroundColor: '#f5f5f5',
        padding: 12,
        borderRadius: 8,
        marginTop: 4,
    },
    codeText: {
        fontSize: 12,
        fontFamily: 'monospace',
        color: '#595959',
    },
    modalActions: {
        flexDirection: 'row',
        gap: 12,
        justifyContent: 'flex-end',
    },
    closeButton: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        flex: 1,
    },
    closeButtonText: {
        color: '#595959',
        fontWeight: 'bold',
        fontSize: 16,
    },
    retryButton: {
        backgroundColor: '#1890ff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    retryButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    emptyText: {
        textAlign: 'center',
        color: '#8c8c8c',
        marginTop: 20,
        fontSize: 14,
    },
    tag: {
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 6,
        paddingVertical: 2,
    }
});

export default JobsScreen;
