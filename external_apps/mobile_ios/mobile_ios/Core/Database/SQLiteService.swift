//
//  SQLiteService.swift
//  mobile_ios
//
//  Created for SQLite integration
//

import Foundation
import SQLite3

class SQLiteService {
    static let shared = SQLiteService()
    internal var db: OpaquePointer?
    
    private init() {
        openDatabase()
        createTable()
        createSyncTable()
    }
    
    // MARK: - Database Path
    private var dbPath: String {
        let fileURL = try! FileManager.default
            .url(for: .documentDirectory, in: .userDomainMask, appropriateFor: nil, create: false)
            .appendingPathComponent("AppDatabase.sqlite")
        return fileURL.path
    }
    
    // MARK: - Open Database
    private func openDatabase() {
        if sqlite3_open(dbPath, &db) != SQLITE_OK {
            print("Error opening database")
            return
        }
        print("Database opened at \(dbPath)")
    }
    
    // MARK: - Create Table
    private func createTable() {
        let createTableString = """
        CREATE TABLE IF NOT EXISTS items(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            description TEXT
        );
        """
        
        var createTableStatement: OpaquePointer? = nil
        if sqlite3_prepare_v2(db, createTableString, -1, &createTableStatement, nil) == SQLITE_OK {
            if sqlite3_step(createTableStatement) == SQLITE_DONE {
                print("Items table created.")
            } else {
                print("Items table could not be created.")
            }
        } else {
            print("CREATE TABLE statement could not be prepared.")
        }
        sqlite3_finalize(createTableStatement)
    }
    
    // MARK: - Insert
    func insert(name: String, description: String) {
        let insertStatementString = "INSERT INTO items (name, description) VALUES (?, ?);"
        var insertStatement: OpaquePointer? = nil
        
        if sqlite3_prepare_v2(db, insertStatementString, -1, &insertStatement, nil) == SQLITE_OK {
            sqlite3_bind_text(insertStatement, 1, (name as NSString).utf8String, -1, nil)
            sqlite3_bind_text(insertStatement, 2, (description as NSString).utf8String, -1, nil)
            
            if sqlite3_step(insertStatement) == SQLITE_DONE {
                print("Successfully inserted row.")
            } else {
                print("Could not insert row.")
            }
        } else {
            print("INSERT statement could not be prepared.")
        }
        sqlite3_finalize(insertStatement)
    }
    
    // MARK: - Read All
    func getAll() -> [Item] {
        let queryStatementString = "SELECT * FROM items;"
        var queryStatement: OpaquePointer? = nil
        var items: [Item] = []
        
        if sqlite3_prepare_v2(db, queryStatementString, -1, &queryStatement, nil) == SQLITE_OK {
            while sqlite3_step(queryStatement) == SQLITE_ROW {
                let id = sqlite3_column_int(queryStatement, 0)
                let name = String(describing: String(cString: sqlite3_column_text(queryStatement, 1)))
                let description = String(describing: String(cString: sqlite3_column_text(queryStatement, 2)))
                
                items.append(Item(id: Int32(id), name: name, description: description))
            }
        } else {
            print("SELECT statement could not be prepared")
        }
        sqlite3_finalize(queryStatement)
        return items
    }
    
    // MARK: - Update
    func update(item: Item) {
        let updateStatementString = "UPDATE items SET name = ?, description = ? WHERE id = ?;"
        var updateStatement: OpaquePointer? = nil
        
        if sqlite3_prepare_v2(db, updateStatementString, -1, &updateStatement, nil) == SQLITE_OK {
            sqlite3_bind_text(updateStatement, 1, (item.name as NSString).utf8String, -1, nil)
            sqlite3_bind_text(updateStatement, 2, (item.description as NSString).utf8String, -1, nil)
            sqlite3_bind_int(updateStatement, 3, item.id ?? 0)
            
            if sqlite3_step(updateStatement) == SQLITE_DONE {
                print("Successfully updated row.")
            } else {
                print("Could not update row.")
            }
        } else {
            print("UPDATE statement could not be prepared")
        }
        sqlite3_finalize(updateStatement)
    }
    
    // MARK: - Delete
    func delete(id: Int32) {
        let deleteStatementString = "DELETE FROM items WHERE id = ?;"
        var deleteStatement: OpaquePointer? = nil
        
        if sqlite3_prepare_v2(db, deleteStatementString, -1, &deleteStatement, nil) == SQLITE_OK {
            sqlite3_bind_int(deleteStatement, 1, id)
            
            if sqlite3_step(deleteStatement) == SQLITE_DONE {
                print("Successfully deleted row.")
            } else {
                print("Could not delete row.")
            }
        } else {
            print("DELETE statement could not be prepared")
        }
        sqlite3_finalize(deleteStatement)
    }
    
    // MARK: - Sync Queue
    private func createSyncTable() {
        let createTableString = """
        CREATE TABLE IF NOT EXISTS sync_queue(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            endpoint TEXT,
            method TEXT,
            payload TEXT,
            timestamp INTEGER,
            retryCount INTEGER
        );
        """
        var createTableStatement: OpaquePointer? = nil
        if sqlite3_prepare_v2(db, createTableString, -1, &createTableStatement, nil) == SQLITE_OK {
            if sqlite3_step(createTableStatement) == SQLITE_DONE {
                print("Sync Queue table created.")
            } else {
                print("Sync Queue table creation failed.")
            }
        }
        sqlite3_finalize(createTableStatement)
    }
    
    func enqueueSyncItem(endpoint: String, method: String, payload: String) {
        let insertStatementString = "INSERT INTO sync_queue (endpoint, method, payload, timestamp, retryCount) VALUES (?, ?, ?, ?, ?);"
        var insertStatement: OpaquePointer? = nil
        
        if sqlite3_prepare_v2(db, insertStatementString, -1, &insertStatement, nil) == SQLITE_OK {
            sqlite3_bind_text(insertStatement, 1, (endpoint as NSString).utf8String, -1, nil)
            sqlite3_bind_text(insertStatement, 2, (method as NSString).utf8String, -1, nil)
            sqlite3_bind_text(insertStatement, 3, (payload as NSString).utf8String, -1, nil)
            sqlite3_bind_int64(insertStatement, 4, Int64(Date().timeIntervalSince1970 * 1000))
            sqlite3_bind_int(insertStatement, 5, 0)
            
            if sqlite3_step(insertStatement) == SQLITE_DONE {
                print("Enqueued sync item.")
            }
        }
        sqlite3_finalize(insertStatement)
    }
    
    func getAllSyncItems() -> [SyncQueueModel] {
        let queryStatementString = "SELECT * FROM sync_queue ORDER BY timestamp ASC;"
        var queryStatement: OpaquePointer? = nil
        var items: [SyncQueueModel] = []
        
        if sqlite3_prepare_v2(db, queryStatementString, -1, &queryStatement, nil) == SQLITE_OK {
            while sqlite3_step(queryStatement) == SQLITE_ROW {
                let id = sqlite3_column_int(queryStatement, 0)
                let endpoint = String(describing: String(cString: sqlite3_column_text(queryStatement, 1)))
                let method = String(describing: String(cString: sqlite3_column_text(queryStatement, 2)))
                let payload = String(describing: String(cString: sqlite3_column_text(queryStatement, 3)))
                let timestamp = sqlite3_column_int64(queryStatement, 4)
                let retryCount = sqlite3_column_int(queryStatement, 5)
                
                items.append(SyncQueueModel(id: id, endpoint: endpoint, method: method, payload: payload, timestamp: timestamp, retryCount: retryCount))
            }
        }
        sqlite3_finalize(queryStatement)
        return items
    }
    
    func deleteSyncItem(id: Int32) {
        let deleteStatementString = "DELETE FROM sync_queue WHERE id = ?;"
        var deleteStatement: OpaquePointer? = nil
        if sqlite3_prepare_v2(db, deleteStatementString, -1, &deleteStatement, nil) == SQLITE_OK {
            sqlite3_bind_int(deleteStatement, 1, id)
            sqlite3_step(deleteStatement)
        }
        sqlite3_finalize(deleteStatement)
    }
}
